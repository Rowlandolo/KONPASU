#!/usr/bin/env python3
"""KONPASU 2.4 layered avatar update + 2.3.2 corrective fixes.
Supports original public 2.3.1 or locally patched 2.3.2. Refuses unknown versions.
No modifications to browser storage, saved profile schema, or user JSON backups.
"""
from __future__ import annotations
import argparse
import datetime as dt
import importlib.util
import json
import os
from pathlib import Path
import shutil
import sys

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('konpasu_patch232',HERE/'apply_232_reference.py')
ref=importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
NAMES=['app.js','avatar2d.js','app.css','index.html','sw.js','version.json']
NEW='avatar-composer-v24.js'
CSS=(HERE/'avatar-v24.css').read_text(encoding='utf-8')
NEW_JS=(HERE/NEW).read_text(encoding='utf-8')

GRAPHIC_240 = r'''function graphic(view=data.profile,d=today(),small=false,previewId=null){
 // Visual-only composition: only resolved and currently wearable equipment enters the renderer.
 // Preview can show locked rewards, but never mutates inventory or unlocks.
 const gear={};
 for(const slot of SLOTS){const item=resolveSlot(slot,view,d);if(item)gear[slot]=item}
 const preview=previewId?itemForId(previewId,view):null;
 const pet=currentPet(view,d);
 const petName=PETS[pet]?.[view.lang==='en'?'en':'de']||pet;
 const result=window.KONPASU_COMPOSER_V24?.render({
  profile:view,gear,preview,pet,petName,petStage:companionStage(view,d),
  rank:currentRankAt(d).name,scale:sizeScale(view),small
 });
 return result||graphicBlueprint(view,d,small,previewId);
}
'''

def replace_once(content, old, new, name):
    count=content.count(old)
    if count!=1:raise ValueError(f'{name}: expected one anchor {old[:65]!r}, found {count}. No changes made.')
    return content.replace(old,new,1)

def build_changes(existing:dict[str,str])->dict[str,str]:
    app,avatar,css,html,sw=tuple(existing[x] for x in NAMES[:5])
    meta=json.loads(existing['version.json'])
    version=meta.get('version')
    if version not in ['2.3.1','2.3.2']:
        raise ValueError(f'Unsupported release {version!r}. This patch needs 2.3.1 or 2.3.2.')
    if NEW in html or 'function graphicBlueprint(' in avatar:
        raise ValueError('Partial avatar 2.4 installation detected; restore code backup and retry.')
    release_old="const KONPASU_RELEASE='"+version+"';"
    app=replace_once(app,release_old,"const KONPASU_RELEASE='2.4.0';",'app.js')
    if 'Version 1.8 · Avatar Studio' in app:
        app=replace_once(app,'Version 1.8 · Avatar Studio','Version ${KONPASU_RELEASE} · Avatar Studio','app.js')
    app=app.replace('konpasu-reloaded-v231','konpasu-reloaded-v240').replace('konpasu-reloaded-v232','konpasu-reloaded-v240')
    if 'function mkButton(' not in avatar:
        avatar=replace_once(avatar,ref.AVATAR_ANCHOR,ref.AVATAR_ANCHOR+'\n'+ref.HELPERS,'avatar2d.js')
    for func in ['function mkButton(','function displayTier(','function KPBackgroundControls(']:
        if avatar.count(func)!=1:raise ValueError('Unexpected helper definitions: '+func)
    begin=avatar.find("if(action==='best'){")
    end=avatar.find("if(action==='old-editor')",begin)
    if begin<0 or end<0 or end-begin>1400:
        raise ValueError('Cannot safely identify best-equipment handler')
    old_best=avatar[begin:end]
    if 'profile.equipped={};recordProfile();return;' not in old_best or 'v.slots' not in old_best:
        raise ValueError('Unexpected best-equipment handler')
    new_best="""if(action==='best'){
  // Recompute entirely from items that remain eligible; do not preserve stale locked gear.
  const next={};
  for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
   const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
   const old=next[item.slot]?itemForId(next[item.slot]):null;
   if(!old||old.tier<i)next[item.slot]=item.id;
  }
  v.slots=next;profile.equipped={};recordProfile();return;
 }
 """
    avatar=avatar[:begin]+new_best+avatar[end:]
    if 'v.pet=fav.pet||v.pet;recordProfile();return;' in avatar:
        avatar=replace_once(avatar,'v.pet=fav.pet||v.pet;recordProfile();return;',
                             'v.pet=fav.pet||v.pet;profile.companion=v.pet;recordProfile();return;','avatar2d.js')
    elif 'profile.companion=v.pet;recordProfile();return;' not in avatar:
        raise ValueError('Cannot identify favorite companion restore')
    empty="||`<p class=\"hint\">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`"
    corrected="||((data.awards||[]).length?'':`<p class=\"hint\">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`)"
    if empty in avatar:
        avatar=replace_once(avatar,empty,corrected,'avatar2d.js')
    elif corrected not in avatar:
        raise ValueError('Cannot identify trophies empty-state')
    avatar=replace_once(avatar,'function graphic(view=data.profile,d=today(),small=false,previewId=null){',
                        'function graphicBlueprint(view=data.profile,d=today(),small=false,previewId=null){','avatar2d.js')
    avatar=replace_once(avatar,'function blueprintModulePanel(){',GRAPHIC_240+'\nfunction blueprintModulePanel(){','avatar2d.js')
    html=replace_once(html,'<script src="./avatar2d.js" defer></script>',
                      '<script src="./avatar-composer-v24.js" defer></script><script src="./avatar2d.js" defer></script>','index.html')
    html=replace_once(html,'content="2.3.1-update-repair"' if version=='2.3.1' else 'content="2.3.2-bugfix"',
                      'content="2.4.0-layered-avatar"','index.html')
    sw=replace_once(sw,"const CACHE='konpasu-offline-v231';" if version=='2.3.1' else "const CACHE='konpasu-offline-v232';",
                    "const CACHE='konpasu-offline-v240';",'sw.js')
    sw=replace_once(sw,"'./avatar2d.js'","'./avatar-composer-v24.js','./avatar2d.js'",'sw.js')
    sw=replace_once(sw,'KONPASU 2.3.1:' if version=='2.3.1' else 'KONPASU 2.3.2:',
                    'KONPASU 2.4.0:','sw.js')
    css=css.rstrip()+'\n\n'+CSS+'\n'
    meta={'version':'2.4.0','release':'KONPASU 2.4.0 – layered 2D avatar preview',
          'features':['goal-calendar-v23.js','training-v22.js','avatar2d.js',NEW,'avatar-art-bundle.js','premium-art-bundle.js'],
          'cache':'konpasu-offline-v240'}
    return {'app.js':app,'avatar2d.js':avatar,'app.css':css,'index.html':html,'sw.js':sw,
            'version.json':json.dumps(meta,ensure_ascii=False,indent=2)+'\n',NEW:NEW_JS}

def apply(root:Path,check:bool=False):
    root=root.resolve()
    for name in NAMES:
        if not (root/name).is_file():raise ValueError(f'Missing {name} in {root}')
    original={name:(root/name).read_text(encoding='utf-8') for name in NAMES}
    if json.loads(original['version.json']).get('version')=='2.4.0':
        if ((root/NEW).is_file() and 'KONPASU_COMPOSER_V24' in (root/NEW).read_text(encoding='utf-8')
            and "konpasu-offline-v240" in original['sw.js']
            and 'function graphicBlueprint(' in original['avatar2d.js']):
            print('Already at KONPASU 2.4.0; no source changes.');return False
        raise ValueError('Partial 2.4.0 detected; restore code backup.')
    if (root/NEW).exists():raise ValueError(f'{NEW} already exists. Refusing overwrite.')
    changes=build_changes(original)  # build, validate before any writes
    if check:
        print('OK: source anchors verified. All changes held in memory; nothing written.');return True
    stamp=dt.datetime.now().strftime('%Y%m%d-%H%M%S-%f')
    backup=root.parent/(root.name+'-CODE-BACKUP-BEFORE-240-'+stamp)
    backup.mkdir()
    for name in NAMES:shutil.copy2(root/name,backup/name)
    written=[]
    try:
        for name,content in changes.items():
            temp=root/(name+'.konpasu240tmp')
            temp.write_text(content,encoding='utf-8')
            os.replace(temp,root/name)
            written.append(name)
    except BaseException:
        for name in NAMES:shutil.copy2(backup/name,root/name)
        if (root/NEW).exists():(root/NEW).unlink()
        for name in changes:
            temp=root/(name+'.konpasu240tmp')
            if temp.exists():temp.unlink()
        raise
    print('KONPASU 2.4.0 sources updated; browser data untouched.')
    print('Source backup:',backup)
    print('Files:',', '.join(written))
    print('Next: node --test tests/test_avatar_composer_v24.cjs; run full app and iPhone tests before publishing.')
    return True

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('root',type=Path)
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    try:apply(args.root,args.check)
    except Exception as e:
        print('PATCH REFUSED:',e,file=sys.stderr);sys.exit(1)
