const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function createLocks(){
 let queue=Promise.resolve();
 return {request(name,callback){const pending=queue.then(()=>callback());queue=pending.catch(()=>{});return pending}};
}
function app({disk=new Map(),lockManager=createLocks(),now}={}){
 const Clock=now?class extends Date{constructor(...args){super(...(args.length?args:[now]))}static now(){return new Date(now).getTime()}}:Date;
 const listeners={},context={console,URL,Intl,Date:Clock,JSON,Math,Promise,structuredClone,setInterval:()=>0,setTimeout:()=>0,clearTimeout(){},navigator:{locks:lockManager},location:{},alert(){},confirm:()=>true,prompt:()=> 'Test',localStorage:{setItem:(k,v)=>disk.set(k,v),getItem:k=>disk.has(k)?disk.get(k):null},document:{addEventListener:(type,fn,capture)=>{(listeners[type]??=[]).push({fn,capture:!!capture})},querySelector:()=>null,querySelectorAll:()=>[]}};
 context.window=context;vm.createContext(context);
 const run=source=>vm.runInContext(source,context);
 for(const file of ['avatar-outfit-v25.js','avatar-outfit-draft-v25.js','avatar-outfit-persistence-v25.js','avatar-outfit-display-v25.js','avatar-appearance-persistence-v25.js','avatar-history-v25.js','app.js','avatar-outfit-store-v25.js','avatar-appearance-store-v25.js','avatar-outfit-session-v25.js','features-v1.js','goal-modules.js','training-library.js','core-v15.js','avatar-art-bundle.js','avatar-composer-v24.js','avatar2d.js','training-v22.js','goal-calendar-v23.js']){
  run(fs.readFileSync(path.join(root,file),'utf8').replace(/^(?:init|render)\(\);$/gm,''));
 }
 run("data=createState(); KONPASU2D.ensure(); render=()=>{}; notice=()=>{};");
 function click(dataset){const b={dataset};const e={target:{closest:selector=>selector==='[data-kp2d]'?b:null},preventDefault(){},stopImmediatePropagation(){this.stopped=true}};
  for(const {fn} of [...listeners.click].sort((a,b)=>Number(b.capture)-Number(a.capture))){fn(e);if(e.stopped)break;}
 }
 function submit(dataset,values){
  context.FormData=class{constructor(){}get(key){return values[key]??null}getAll(key){return values[key]===undefined?[]:[values[key]]}};
  const form={dataset,closest:selector=>['[data-submit]','form[data-submit]'].includes(selector)||selector==='[data-submit^="gm-"]'&&dataset.submit.startsWith('gm-')?form:null};
  const e={target:form,preventDefault(){},stopImmediatePropagation(){this.stopped=true}};
  for(const {fn} of [...listeners.submit].sort((a,b)=>Number(b.capture)-Number(a.capture))){fn(e);if(e.stopped)break;}
 }
 async function change(target){
  const e={target,preventDefault(){},stopImmediatePropagation(){this.stopped=true}};
  for(const {fn} of [...(listeners.change||[])].sort((a,b)=>Number(b.capture)-Number(a.capture))){await fn(e);if(e.stopped)break;}
 }
 return {run,click,submit,change,context,disk};
}
module.exports={app,root,createLocks};
