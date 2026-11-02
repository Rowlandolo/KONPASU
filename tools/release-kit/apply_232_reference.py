#!/usr/bin/env python3
"""KONPASU 2.3.2: conservative, repeatable source patch. No browser data access.
Usage: python apply_232.py /path/to/KONPASU
This script refuses to proceed if the expected 2.3.1 source anchors are absent.
"""
from __future__ import annotations
import argparse
import datetime
import json
from pathlib import Path
import shutil
import sys

RELEASE = "2.3.2"
APP_ANCHOR = "const KONPASU_RELEASE='2.3.1';"
AVATAR_ANCHOR = "const tr=(de,en)=>data.profile.lang==='en'?en:de;"

HELPERS = r'''// 2.3.2: Functions referenced throughout Avatar Studio but absent from v1.8.
function mkButton(de,en,action,attrs='',cls='kp2d-button'){
  return `<button type="button" class="${esc(cls)}" data-kp2d="${esc(action)}" ${attrs}>${esc(tr(de,en))}</button>`;
}
function displayTier(tier){
  const de=['Grundausstattung','Gewöhnlich','Selten','Episch','Legendär','Mythisch'];
  const en=['Starter','Common','Rare','Epic','Legendary','Mythic'];
  return tr(de[tier]||de[0],en[tier]||en[0]);
}
function KPBackgroundControls(v){
  const scenes=[['garden','Garten','Garden'],['forest','Wald','Forest'],['temple','Tempel','Temple'],['castle','Burg','Castle'],['moon','Mond','Moon'],['library','Bibliothek','Library'],['festival','Fest','Festival'],['ocean','Meer','Ocean'],['mountain','Berge','Mountains']];
  return `<div class="kp2d-filter kp2d-scenes" role="group" aria-label="${tr('Szene auswählen','Choose scene')}">${scenes.map(([key,de,en])=>mkButton(de,en,'scene',`data-value="${key}"`,'kp2d-tab '+(v.scene===key?'current':''))).join('')}</div>`;
}
'''

GEAR_MARKER = '  const activeSummary=(view.avatar2d?.slots?Object.values(view.avatar2d.slots).filter(Boolean).length:0)||0;'
GEAR_REPLACEMENT = r'''  // 2.3.2: Display *actually wearable* items rather than merely saved selections.
  // This is a status overlay; the underlying blueprint is still static until layered art 2.4.
  const liveItems=SLOTS.map(slot=>resolveSlot(slot,view,d)).filter(Boolean);
  const activeSummary=liveItems.length;
  const selectedNames=liveItems.slice(0,3).map(item=>`<span class="kp232-item">${esc(item.title)}</span>`).join('');
  const more=liveItems.length>3?`<span class="kp232-item">+${liveItems.length-3}</span>`:'';
  const petLabel=PETS[pet]?.[data.profile.lang==='en'?'en':'de']||'Kitsune';
  const liveGear=`<div class="kp232-live-gear" aria-label="${tr('Aktuell tragbare Ausrüstung','Currently wearable equipment')}"><span class="kp232-item kp232-companion">${esc(petLabel)}</span>${selectedNames}${more}</div>`;'''

BEST_OLD = '''  if(action==='best'){
   for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
    const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
    const old=itemForId(v.slots[item.slot]);if(!old||old.tier<i)v.slots[item.slot]=item.id;
   }
   profile.equipped={};recordProfile();return;
  }'''
BEST_NEW = '''  if(action==='best'){
   // 2.3.2: Recompute from scratch, otherwise a previously chosen locked
   // high-tier item can prevent a currently wearable lower-tier item.
   const next={};
   for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
    const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
    const previous=next[item.slot]?itemForId(next[item.slot]):null;
    if(!previous||previous.tier<i)next[item.slot]=item.id;
   }
   v.slots=next;profile.equipped={};recordProfile();return;
  }'''

CSS_232 = r'''
/* KONPASU 2.3.2: compact, non-destructive feedback on existing avatar blueprint. */
.kp2d-blueprint-stage{position:relative}
.kp232-live-gear{position:absolute;bottom:43px;left:9px;right:9px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;pointer-events:none;z-index:3}
.kp232-item{background:rgba(249,247,238,.92);border:1px solid rgba(45,83,65,.25);box-shadow:0 1px 5px rgba(22,49,37,.09);color:#264638;font-size:10px;font-weight:600;line-height:1.3;border-radius:100px;padding:4px 7px;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kp232-companion{background:#dfe9dc}
.kp2d-scenes{display:flex;gap:5px;flex-wrap:wrap}
@media(max-width:380px){.kp232-item{font-size:9px;padding:3px 5px}}
'''


def replace_once(s: str, needle: str, new: str, filename: str) -> str:
    n=s.count(needle)
    if n != 1:
        raise ValueError(f"{filename}: expected 1 instance of {needle[:75]!r}, found {n}; refusing unsafe patch")
    return s.replace(needle, new, 1)


def build_changes(originals: dict[str,str]) -> dict[str,str]:
    app=originals['app.js']
    avatar=originals['avatar2d.js']
    html=originals['index.html']
    sw=originals['sw.js']
    css=originals['app.css']
    # No changes to createState, migrate, IndexedDB schema, backup or goal records.
    app=replace_once(app, APP_ANCHOR, "const KONPASU_RELEASE='2.3.2';", 'app.js')
    app=replace_once(app,'Version 1.8 · Avatar Studio','Version ${KONPASU_RELEASE} · Avatar Studio','app.js')
    app=app.replace('konpasu-reloaded-v231','konpasu-reloaded-v232')

    avatar=replace_once(avatar, AVATAR_ANCHOR, AVATAR_ANCHOR+'\n'+HELPERS, 'avatar2d.js')
    avatar=replace_once(avatar, GEAR_MARKER, GEAR_REPLACEMENT, 'avatar2d.js')
    avatar=replace_once(avatar, '    ${previewText}\n  </div>`;', '    ${previewText}\n    ${liveGear}\n  </div>`;', 'avatar2d.js')
    avatar=replace_once(avatar,'<span>${tr(\'Kitsune-Begleiter\',\'Kitsune companion\')}</span>', '<span>${esc(petLabel)}</span>', 'avatar2d.js')
    avatar=replace_once(avatar, BEST_OLD, BEST_NEW, 'avatar2d.js')
    avatar=replace_once(avatar, 'v.pet=fav.pet||v.pet;recordProfile();return;', 'v.pet=fav.pet||v.pet;profile.companion=v.pet;recordProfile();return;', 'avatar2d.js')
    # Correct the empty message when only the persistent goal awards exist.
    empty="||`<p class=\"hint\">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`"
    corrected="||((data.awards||[]).length?'':`<p class=\"hint\">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`)"
    avatar=replace_once(avatar,empty,corrected,'avatar2d.js')

    html=replace_once(html,'2.3.1-update-repair','2.3.2-bugfix','index.html')
    sw=replace_once(sw,"const CACHE='konpasu-offline-v231';","const CACHE='konpasu-offline-v232';",'sw.js')
    sw=replace_once(sw,'KONPASU 2.3.1:','KONPASU 2.3.2:','sw.js')
    if '/* KONPASU 2.3.2:' in css:
        raise ValueError('app.css: already appears patched')
    css=css.rstrip()+"\n"+CSS_232
    meta={'version':RELEASE,'release':'KONPASU 2.3.2 – Avatar & Rewards bugfix',
          'features':['goal-calendar-v23.js','training-v22.js','avatar2d.js','premium-art-bundle.js'],
          'cache':'konpasu-offline-v232'}
    return {'app.js':app,'avatar2d.js':avatar,'index.html':html,'sw.js':sw,
            'app.css':css,'version.json':json.dumps(meta,ensure_ascii=False,indent=2)+'\n'}


def apply(root:Path,check:bool=False):
    names=['app.js','avatar2d.js','index.html','sw.js','app.css','version.json']
    for name in names:
        if not (root/name).is_file():
            raise ValueError(f'Missing {name} in {root}. Place the script next to the checked-out KONPASU files.')
    originals={name:(root/name).read_text(encoding='utf-8') for name in names}
    if "const KONPASU_RELEASE='2.3.2';" in originals['app.js']:
        complete=("function KPBackgroundControls(" in originals['avatar2d.js']
                  and "konpasu-offline-v232" in originals['sw.js']
                  and '2.3.2-bugfix' in originals['index.html']
                  and json.loads(originals['version.json']).get('version')=='2.3.2')
        if not complete:
            raise ValueError('Partial 2.3.2 source detected. Verify/restore the code backup instead of patching over a partial update.')
        print('KONPASU 2.3.2 already applied — no changes.')
        return False
    changes=build_changes(originals)  # complete all replacements before touching any file
    if check:
        print('OK: 2.3.1 source anchors verified. Patch can be applied. No files changed.')
        return True
    backup=root.parent/(root.name+'-CODE-BACKUP-BEFORE-232-'+datetime.datetime.now().strftime('%Y%m%d-%H%M%S'))
    backup.mkdir()
    for name in names:
        shutil.copy2(root/name,backup/name)
    print('Original SOURCE files backed up to:',backup)
    try:
        for name,content in changes.items():
            (root/name).write_text(content,encoding='utf-8')
    except BaseException:
        for name in names:
            shutil.copy2(backup/name,root/name)
        raise
    print('OK: KONPASU 2.3.2 source files updated. User data was not accessed.')
    print('Next: run python tests/test_232.py <path_to_repo> and deploy source files.')
    return True


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('root',nargs='?',default='.',type=Path)
    p.add_argument('--check',action='store_true',help='Verify source anchors only, without writes')
    args=p.parse_args()
    try:apply(args.root.resolve(),args.check)
    except Exception as exc:
        print('PATCH REFUSED:',exc,file=sys.stderr)
        sys.exit(1)
