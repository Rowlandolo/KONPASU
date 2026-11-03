'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {boards,families}=require('./artbook-prototype-definitions.cjs'),vectors=require('../design/avatar/catalog-vectors.js');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'design/avatar'),legacy=require('../docs/REWARD_MAPPING.json'),original=new Map(legacy.map(x=>[x.id,x]));
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'premium-art-bundle.js'),'utf8'),context);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const destination=path.join(dir,'references-v10');fs.mkdirSync(destination,{recursive:true});
const reference=key=>{const uri=context.window.KONPASU_PREMIUM_SRC(key);if(!uri)throw Error('Missing reference '+key);const bytes=Buffer.from(uri.slice(uri.indexOf(',')+1),'base64'),name=path.basename(key);fs.writeFileSync(path.join(destination,name),bytes);return {bundleKey:key,file:'./references-v10/'+name,bytes:bytes.length,sha256:hash(bytes),unaltered:true}};
const round=n=>Math.round(n*1000)/1000;
function boxB(a,anchor){
 const [x,y,width,height]=a;
 if(['scene','effect','head','face-study','feet'].includes(anchor))return a.slice();
 if(anchor==='forearm-left')return [x-13,y,width*1.1,height*1.1].map(round);
 if(anchor==='forearm-right')return [x+12,y,width*1.1,height*1.1].map(round);
 if(anchor==='wrist-left')return [x-12.5,y,width*1.1,height*1.1].map(round);
 if(anchor==='wrist-right')return [x+10,y,width*1.1,height*1.1].map(round);
 if(anchor==='hip-left')return [x-12,y,width,height];
 if(anchor==='hip-right')return [x+12,y,width,height];
 return [255+(x-251)*1.12,y,width*1.12,height*1.12].map(round);
}
function modules(kind){
 const m=(shape,z,anchor,box,extra={})=>({shape,z,anchor,fit:{'form-a':box,'form-b':boxB(box,anchor)},...extra});
 const effect=shape=>m(shape,60,'effect',[34,150,444,444],{category:'effect'});
 const prop=shape=>m(shape,410,'hip-left',[178,291,64,80],{category:'accessory',attachment:'Obi mount; neutral hands unchanged'});
 const arm=(shape='armwrap')=>[m(shape,498,'forearm-left',[135,290,36,57],{occludedBy:['kimono','outer-front'],category:'arm'}),m(shape,499,'forearm-right',[341,290,36,57],{occludedBy:['kimono','outer-front'],category:'arm'})];
 const garment=long=>[m('garment-rear',170,'torso',[long?118:133,113,long?266:236,long?425:335],{category:'outer-rear'}),m('garment-front',365,'torso',[long?126:137,116,long?250:228,long?400:324],{category:'outer-front',occludes:'arm'})];
 const sash=()=>[m('sash-band',352,'waist',[208,249,94,42],{category:'waist'}),m('sash-bow',375,'waist',[229,264,78,74],{category:'waist-front'})];
 const lantern=paper=>[m(paper?'paper-lantern':'lantern',414,'hip-right',[340,268,66,90],{category:'accessory',attachment:'Suspended from right Obi; not a hand-grip claim'})];
 switch(kind){
  case 'existing':return [];
  case 'scarf':return [m('scarf-tail',145,'torso',[165,104,85,163],{category:'neck-rear'}),m('scarf-band',390,'torso',[221,102,76,49],{category:'neck-front'})];
  case 'boots':case 'sandals':return [m(kind==='boots'?'boot-left':'sandal-left',305,'feet',[145,667,77,75],{category:'feet'}),m(kind==='boots'?'boot-right':'sandal-right',306,'feet',[278,668,84,74],{category:'feet'})];
  case 'armwraps':return arm();
  case 'sleeves':return arm('sleeve');
  case 'cloak':return garment(true);
  case 'haori':return garment(false);
  case 'apronHaori':return [...garment(false),m('garment-front',367,'torso',[199,192,112,205],{category:'apron-front'})];
  case 'storm':return [...garment(true),m('breastplate',452,'torso',[212,149,91,136],{category:'torso-armor'}),effect('wind')];
  case 'satchel':return [m('strap',380,'torso',[204,128,93,171],{category:'strap'}),prop('satchel')];
  case 'hatCharm':return [prop('hat-charm')];
  case 'banner':return [m('banner',45,'scene',[46,129,150,290],{category:'scene-prop'}),effect('wind')];
  case 'ribbons':return [m('ribbon',146,'torso',[137,143,64,175],{category:'ribbon-rear'}),m('ribbon',147,'torso',[311,143,64,175],{category:'ribbon-rear'})];
  case 'sash':return sash();
  case 'dragonAura':return [effect('dragon'),m('wind',650,'effect',[55,459,390,205],{category:'effect-front'})];
  case 'bamboo':case 'bottle':case 'crystal':case 'gourd':return [prop(kind)];
  case 'sealedGourd':return [prop('sealed-gourd')];
  case 'dragonVessel':return [prop('vessel'),m('dragon',70,'effect',[45,325,182,174],{category:'effect'})];
  case 'hairpin':return [m('hairpin-stem',95,'head',[204,37,42,43],{category:'head-rear'}),m('hairpin',623,'head',[198,29,48,60],{category:'head-front'})];
  case 'pillowCharm':return [prop('pillow-charm')];
  case 'lantern':return lantern(false);
  case 'paperLantern':return lantern(true);
  case 'moonAura':return [effect('moon')];
  case 'bento':return [prop('bento')];
  case 'pouch':return [prop('pouch')];
  case 'harvest':return [m('harvest-crest',65,'effect',[53,257,160,160],{category:'emblem'}),prop('harvest-bowl')];
  case 'sealCharm':return [prop('seal-charm')];
  case 'bracelet':return [m('bracelet',516,'wrist-left',[137,334,31,31],{category:'arm',occludedBy:['kimono','outer-front']})];
  case 'smileStudy':return [m('smile-study',670,'face-study',[322,38,62,62],{category:'expression-study',attachment:'Separate expression study beside head, not a replacement face'})];
  case 'calmStudy':return [m('calm-study',671,'face-study',[322,38,62,62],{category:'expression-study',attachment:'Separate expression study beside head, not a replacement face'})];
  case 'fan':case 'mapFan':case 'festivalFan':return [prop({fan:'lotus-fan',mapFan:'map-fan',festivalFan:'festival-fan'}[kind])];
  case 'lotusAura':return [effect('lotus')];
  case 'festivalScene':return [m('scene-mountains',10,'scene',[0,0,512,768],{category:'background'}),m('scene-torii',20,'scene',[10,180,220,400],{category:'background-architecture'}),m('scene-lanterns',30,'scene',[300,60,200,400],{category:'background-decoration'})];
  case 'bookCharm':return [prop('book-charm')];
  case 'scroll':return [prop('scroll')];
  case 'checkScroll':return [prop('check-scroll')];
  case 'book':return [prop('book')];
  case 'archive':return [m('archive',411,'hip-left',[147,284,97,96],{category:'accessory'}),m('scene-torii',40,'scene',[40,86,180,280],{category:'archive-frame'})];
  case 'brushSet':return [m('brush',413,'hip-right',[322,277,40,96],{category:'accessory'}),m('inkstone',412,'hip-left',[181,301,58,45],{category:'accessory'})];
  case 'scrollCase':return [prop('scroll-case')];
  case 'featherAura':return [prop('feather'),effect('wind')];
  case 'toolkit':return [prop('toolkit')];
  case 'measuringCord':return [prop('measuring-cord')];
  case 'craftBrooch':return [m('craft-brooch',425,'torso',[279,138,48,48],{category:'brooch'})];
  case 'toolRoll':return [m('tool-roll',411,'hip-left',[152,290,90,80],{category:'accessory'})];
  case 'toolbox':return [m('toolbox',411,'hip-left',[144,285,99,88],{category:'accessory'})];
  case 'hourglass':return [prop('hourglass')];
  case 'halo':return [effect('still-halo')];
  case 'incenseCharm':return [prop('incense-charm')];
  case 'mat':return [m('mat',295,'scene',[35,651,125,95],{category:'ground-accessory'})];
  case 'mirror':return [prop('mirror')];
  case 'scrollHalo':return [m('scroll-halo',55,'effect',[60,200,390,390],{category:'effect'})];
  case 'friendshipKnot':return [prop('friendship-knot')];
  case 'teaPair':return [m('tea-pair',411,'hip-left',[144,294,96,72],{category:'accessory'})];
  case 'bondCrest':return [m('bond-crest',68,'effect',[70,230,155,155],{category:'emblem'})];
  case 'leafBrooch':return [m('leaf-brooch',426,'torso',[275,135,48,48],{category:'brooch'})];
  case 'shrineScene':return [m('scene-mountains',10,'scene',[0,0,512,768],{category:'background'}),m('scene-torii',22,'scene',[29,105,210,432],{category:'background-architecture'})];
  case 'horizonScene':return [m('scene-mountains',11,'scene',[0,0,512,768],{category:'background'})];
  case 'sakuraAura':return [effect('wind'),m('sakura',652,'effect',[56,160,400,400],{category:'effect-front'})];
  case 'sunsetAura':return [m('scene-mountains',12,'scene',[0,0,512,768],{category:'background'}),effect('wind')];
  case 'watch':return [prop('watch')];
  case 'unpluggedRibbon':return [prop('unplugged-ribbon')];
  case 'token':return [prop('token')];
  case 'controllerCharm':return [prop('controller-charm')];
  case 'teaSet':return [m('tea-pair',411,'hip-left',[143,309,96,66],{category:'accessory'}),m('teapot',412,'hip-left',[162,280,69,63],{category:'accessory'})];
  case 'groundedAura':return [m('grounded',61,'effect',[34,150,444,444],{category:'effect'})];
  default:throw Error('Missing article geometry '+kind);
 }
}
const reviewedBoards=new Map(),items=[];
for(const [family,label,board,row,theme,entries] of families){
 if(!reviewedBoards.has(board))reviewedBoards.set(board,reference('assets/'+boards[board]+'.webp'));
 entries.forEach(([titleDe,titleEn,kind,depiction],index)=>{
  const id=family+'-'+(index+1),old=original.get(id);if(!old)throw Error('Unknown stable ID '+id);
  const referenceCard=reference('reward-art/'+id+'.webp'),parts=modules(kind).map((p,i)=>{
   const partId=id+'-study-'+(i+1),a=vectors.art(p.shape,theme,partId);
   const file='./vector-prototypes-v10/'+partId+'.svg',bytes=Buffer.from(vectors.svg(p.shape,theme,partId));
   fs.mkdirSync(path.join(dir,'vector-prototypes-v10'),{recursive:true});fs.writeFileSync(path.join(dir,file),bytes);
   return {...p,partId,file,sha256:hash(bytes),bytes:bytes.length,viewBox:a.viewBox,theme};
  });
  const categories=[...new Set(parts.map(p=>p.category))];
  const clothing=parts.some(p=>p.occludes==='arm'),study=categories.includes('expression-study');
  items.push({id,family,familyLabelDe:label,tier:index+1,titleDe,titleEn,kind,theme,
   legacy:{titleDe:old.title,slot:old.slot,successfulCompletedWeeks:old.successfulCompletedWeeks,goal:old.goal,wearabilityRule:old.wearabilityRule},
   reference:{board:reviewedBoards.get(board),card:referenceCard,row,column:index+1,depiction},
   semanticStatus:'board-depiction-reviewed-legacy-semantics-preserved',
   titleMismatch:old.title!==titleDe,prototypeStatus:kind==='existing'?'existing-six-article-png-prototype':'vector-fit-prototype',
   fidelity:kind==='existing'?'image-generated-canonical-png':'code-drawn-vector-fit-study-not-premium-final',
   visualAcceptance:kind==='existing'?'prior-two-form-startset-review':'see-separate-catalogue-verification-v10',
   categories,parts,
   fitNotes:study?'Mimikstudie neben dem Kopf; kein ungetestetes Überschreiben des vorhandenen Gesichts.':clothing?'Eigene Vorder-/Hinterteile; Frontstoff verdeckt Armartikel über tatsächliche Vektorflächen.':parts.some(p=>p.category==='accessory')?'Am Obi befestigter Prototyp für diese Standpose; freie Hände bleiben unverändert.':parts.some(p=>p.anchor==='effect'||p.anchor==='scene')?'Eigene Hintergrund-/Effektgruppe; transparente Module bleiben gemeinsam wählbar.':'Explizite Registrierung für beide vorhandenen Standfiguren und eine Pose.',
   combinationNotes:'Gemeinsame Auswahl bleibt erhalten. Deckende gleiche Flächen dürfen sich natürlich verdecken; Einzel-Sichtbarkeit und Reihenfolge sind unabhängig von Besitz. Keine Slotverdrängung.',
   remaining:kind==='existing'?['App-/Offlineintegration','Physische Geräteabnahme']:['Premiumzeichnung statt Vektorstudie','Individuelle finale Detailpassform','App-/Offlineintegration','Physische Geräteabnahme',...(study?['Neue vollständige Mimikgrafiken für beide Figuren']:[])]});
 });
}
if(items.length!==95||items.filter(i=>i.parts.length).length!==89)throw Error('Incomplete catalogue');
const result={version:1,scope:'isolated-development-prototypes-no-storage-or-unlock-changes',source:'premium-art-bundle.js',
 sourceBundleSHA256:hash(fs.readFileSync(path.join(root,'premium-art-bundle.js'))),
 sourceReview:'Five original boards visually inspected; row/column and all stable reward-card keys retained. Names describe artwork only, not live reward renames.',
 limits:['Vector fit studies are not premium-final artwork.','Two standing body forms in one pose.','Expression sets remain visibly marked separate studies until proper face sources exist.','Source bitmap budget for the six-article atelier is unchanged; all-95 inline-vector DOM/GPU/peak cost needs physical measurement.'],
 families:families.map(([id,label])=>({id,label})),items};
fs.writeFileSync(path.join(dir,'catalog-prototypes-v10.json'),JSON.stringify(result,null,2)+'\n');
const escape=s=>s.replaceAll('|','/'),doc=['# Artbook-Katalog: 95 Artikel und 89 neue Passformprototypen','','Die Nutzeranweisung vom 03.11.2026 priorisiert alle übrigen Artikel vor der App-Anbindung. Diese Lieferung erstellt echte schaltbare Vektorstudien, keine 89 fertigen Premium-PNGs. Die vorhandenen sechs PNG-Prototypen bleiben erhalten. Alle Zuordnungen beruhen auf den fünf tatsächlichen Artbooktafeln; Live-Bezeichnungen, IDs und Rewardregeln bleiben unverändert.','','Interaktive Werkstatt: `design/avatar/catalog.html`. Maschinenlesbare Detailverträge samt Quell-/Grafikhashes und beiden Passformen: `catalog-prototypes-v10.json`. Jede neue Studie besitzt eigene transparente SVG-Dateien unter `vector-prototypes-v10/`; Referenzen sind bytegleiche Kopien aus dem bestehenden Bundle.','','Gemeinsame Auswahl aller 95 Artikel bleibt möglich. Deckende Kleidung und Hintergründe können einander verdecken; Sichtbarkeit und Reihenfolge sind ausdrücklich steuerbar. Hintergrund/Atmosphäre ist kein Besitzersatz und keine neue Begleitertierart. Mimikstudien sind als solche neben dem Kopf dargestellt, nicht als fertige neue Gesichtsanatomie ausgegeben. Handobjekte werden für diese feste Pose am Obi geführt; echte neue Griffposen sind noch nicht gezeichnet.',''];
for(const f of result.families){doc.push('## '+f.label,'');for(const i of items.filter(i=>i.family===f.id)){doc.push('### '+i.id+' · '+i.titleDe,'',`Original: **${i.titleEn}**, Tafel ${i.reference.board.bundleKey}, Reihe ${i.reference.row}, Spalte ${i.reference.column}. ${i.reference.depiction}`,'',`Unveränderte Legacy-Zuordnung: ${i.legacy.titleDe}; Slot ${i.legacy.slot}; ${i.legacy.successfulCompletedWeeks} belegte abgeschlossene Woche(n). ${i.legacy.wearabilityRule}.`,'',`Prototyp: ${i.prototypeStatus}. ${i.fitNotes}`, '', '| Modul | Zeichnung / Tiefe | Form A: x, y, B, H | Form B: x, y, B, H |','|---|---|---|---|');for(const p of i.parts)doc.push(`| ${p.partId} | ${p.shape} / ${p.z} | ${p.fit['form-a'].join(', ')} | ${p.fit['form-b'].join(', ')} |`);if(!i.parts.length)doc.push('| Vorhandene PNG-Module | Siehe prototype-assets.json / avatar-rig-v25.js | Eigenes geprüftes Profil | Eigenes geprüftes Profil |');doc.push('',i.combinationNotes,'','Offen: '+i.remaining.join('; ')+'.','');}}
fs.writeFileSync(path.join(root,'docs/ARTBOOK_95_PROTOTYPES.md'),doc.join('\n')+'\n');
console.log(JSON.stringify({articles:items.length,newVectorArticles:items.filter(i=>i.parts.length).length,newModules:items.reduce((n,i)=>n+i.parts.length,0),referenceBoards:reviewedBoards.size}));
