import './polyfills.server.mjs';
import{a as w}from"./chunk-TTPJSPKX.mjs";import{a as f,b as y}from"./chunk-SU5WNHQQ.mjs";import{a as u}from"./chunk-ULOEEDMH.mjs";import{Zb as g,ba as h,ga as l,uc as b}from"./chunk-WAP4PGVX.mjs";import{j as s}from"./chunk-H6KHSOBK.mjs";var P=(()=>{let c=class c{constructor(a,o,r,e,i){this.locale=a,this.idiomaSV=o,this.gvSV=r,this.palabraSV=e,this.http=i}importDataFromFile(a,o){return s(this,null,function*(){let r=yield this.readFileContent(a),e=JSON.parse(r),i=String(b(Date.now(),"yyyy-MM-dd mm:ss",this.locale));yield this.idiomaSV.createIdiomaWithID(i,o,e.idioma.nombre,e.idioma.lenguaje,e.idioma.pribate);for(let n of e.idioma.gv){yield this.delay(1e3);let t=String(b(Date.now(),"yyyy-MM-dd mm:ss",this.locale));yield this.gvSV.createGrupoVocabularioWithID(t,i,n.nombre,n.nombre_col1,n.nombre_col2);for(let m of n.palabras)yield this.delay(1e3),yield this.createPalabras(t,m)}})}readFileContent(a){return new Promise((o,r)=>{let e=new FileReader;e.onload=i=>o(e.result),e.onerror=i=>r(e.error),e.readAsText(a)})}delay(a){return new Promise(o=>setTimeout(o,a))}createPalabras(a,o){return s(this,null,function*(){yield this.palabraSV.createPalabra(a,o.col1,o.col2)})}getIdioma(a){return s(this,null,function*(){return yield this.idiomaSV.getIdioma(a)})}getData(a){return s(this,null,function*(){let o={idioma:{nombre:"",lenguaje:"",pribate:!1,gv:[]}},r=0,e=0,i=yield this.getIdioma(a);this.gvSV.getListGrupoVocabulariobyIdiomaId(a).subscribe(n=>{o.idioma.nombre=i.nombre,o.idioma.lenguaje=i.lenguaje,o.idioma.pribate=i.private,r=n.length;for(let t of n){let m={nombre:t.nombre,nombre_col1:t.nombre_col1,nombre_col2:t.nombre_col2,palabras:[]};this.palabraSV.getListPalabrabyGvId(t.id).subscribe(j=>{j.forEach(p=>{m.palabras.push({col1:p.col1,col2:p.col2})}),o.idioma.gv.push(m),e=e+1,r==e&&this.exportDataToFile(o)})}})})}exportDataToFile(a){return s(this,null,function*(){try{let o=JSON.stringify(a),r=new Date().toLocaleString().replace(/[,:\s\/]/g,"-"),e=`${a.idioma.nombre}-${r}.json`,i=new Blob([o],{type:"application/json"}),n=window.URL.createObjectURL(i),t=document.createElement("a");t.href=n,t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),window.URL.revokeObjectURL(n),console.log("Archivo JSON guardado exitosamente.")}catch(o){console.error("Error al guardar el archivo JSON:",o)}})}};c.\u0275fac=function(o){return new(o||c)(l(g),l(w),l(y),l(f),l(u))},c.\u0275prov=h({token:c,factory:c.\u0275fac,providedIn:"root"});let d=c;return d})();export{P as a};
