from __future__ import annotations
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

HERE=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('apply_240',HERE/'apply_240.py')
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

AVATAR='''(function(){
const tr=(de,en)=>data.profile.lang==='en'?en:de;
function graphic(view=data.profile,d=today(),small=false,previewId=null){
 const activeSummary=(view.avatar2d?.slots?Object.values(view.avatar2d.slots).filter(Boolean).length:0)||0;
 return `<div class="stage">${displayTier(2)} ${activeSummary}</div>`;
}
function blueprintModulePanel(){return '';}
function actions(action,profile,v){
 if(action==='best'){
  for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
   const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
   const old=itemForId(v.slots[item.slot]);if(!old||old.tier<i)v.slots[item.slot]=item.id;
  }
  profile.equipped={};recordProfile();return;
 }
 if(action==='old-editor'){return;}
 const fav={};v.pet=fav.pet||v.pet;recordProfile();return;
}
const t=`${(data.streakAwards||[]).map(a=>a.count).join('')||`<p class="hint">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`}`;
})();
'''

def fixture(root:Path):
    (root/'app.js').write_text("const KONPASU_RELEASE='2.3.1';\nconst foo=`Version 1.8 · Avatar Studio`;\nconst update='konpasu-reloaded-v231';\nfunction createState(){return {goals:[],checks:[],sessions:[]}}\nfunction migrate(state){return state;}\n",encoding='utf-8')
    (root/'avatar2d.js').write_text(AVATAR,encoding='utf-8')
    (root/'app.css').write_text('body{color:#234;}\n',encoding='utf-8')
    (root/'index.html').write_text('<meta name="app-version" content="2.3.1-update-repair"><script src="./avatar2d.js" defer></script>',encoding='utf-8')
    (root/'sw.js').write_text("/* KONPASU 2.3.1: cache */\nconst CACHE='konpasu-offline-v231';\nconst CRITICAL=['./avatar2d.js'];\n",encoding='utf-8')
    (root/'version.json').write_text(json.dumps({'version':'2.3.1'}),encoding='utf-8')
    (root/'KONPASU-User-Backup.json').write_text('{"goals":[1],"trainings":[2],"history":[3]}',encoding='utf-8')

class TestPatch(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)/'KONPASU';self.root.mkdir();fixture(self.root)
    def test_verify_only_does_not_write(self):
        old={p.name:p.read_bytes() for p in self.root.iterdir() if p.is_file()}
        self.assertTrue(module.apply(self.root,check=True))
        self.assertEqual(old,{p.name:p.read_bytes() for p in self.root.iterdir() if p.is_file()})
    def test_install_and_idempotence_and_preserve_data(self):
        orig=(self.root/'KONPASU-User-Backup.json').read_bytes()
        self.assertTrue(module.apply(self.root))
        self.assertFalse(module.apply(self.root))
        self.assertEqual((self.root/'KONPASU-User-Backup.json').read_bytes(),orig)
        self.assertIn('function createState(){return {goals:[],checks:[],sessions:[]}}',(self.root/'app.js').read_text())
        av=(self.root/'avatar2d.js').read_text()
        self.assertIn('function graphicBlueprint(',av)
        self.assertIn('KONPASU_COMPOSER_V24',av)
        self.assertIn('const next={}',av)
        self.assertIn('profile.companion=v.pet',av)
        self.assertIn("((data.awards||[]).length?",av)
        self.assertIn("'./avatar-composer-v24.js'",(self.root/'sw.js').read_text())
        self.assertLess((self.root/'index.html').read_text().index('avatar-composer-v24.js'),(self.root/'index.html').read_text().index('avatar2d.js'))
        self.assertEqual(json.loads((self.root/'version.json').read_text())['version'],'2.4.0')
        for fname in ['app.js','avatar2d.js','avatar-composer-v24.js','sw.js']:
            subprocess.run(['node','--check',str(self.root/fname)],check=True,capture_output=True)
    def test_refuses_modified_source_without_partial_write(self):
        av=self.root/'avatar2d.js';av.write_text(av.read_text().replace('function blueprintModulePanel(){','function missing(){'))
        old={p.name:p.read_bytes() for p in self.root.iterdir() if p.is_file()}
        with self.assertRaises(ValueError):module.apply(self.root)
        self.assertEqual(old,{p.name:p.read_bytes() for p in self.root.iterdir() if p.is_file()})
    def test_refuses_unknown_version(self):
        f=self.root/'version.json';f.write_text('{"version":"9.99"}')
        with self.assertRaises(ValueError):module.apply(self.root)
    def test_upgrade_from_232_source(self):
        app=self.root/'app.js'
        text=app.read_text().replace("const KONPASU_RELEASE='2.3.1'","const KONPASU_RELEASE='2.3.2'")
        app.write_text(text,encoding='utf-8')
        html=self.root/'index.html';html.write_text(html.read_text().replace('2.3.1-update-repair','2.3.2-bugfix'))
        sw=self.root/'sw.js';sw.write_text(sw.read_text().replace('2.3.1:','2.3.2:').replace('konpasu-offline-v231','konpasu-offline-v232'))
        (self.root/'version.json').write_text('{"version":"2.3.2"}')
        self.assertTrue(module.apply(self.root))
        self.assertIn('function graphicBlueprint(', (self.root/'avatar2d.js').read_text())
        self.assertEqual(json.loads((self.root/'version.json').read_text())['version'],'2.4.0')

    def test_refuses_preexisting_new_module(self):
        (self.root/'avatar-composer-v24.js').write_text('Do not overwrite')
        with self.assertRaises(ValueError):module.apply(self.root)

if __name__=='__main__':unittest.main(verbosity=2)
