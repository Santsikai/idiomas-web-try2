import{a as j,b as J}from"./chunk-5FP5CUWN.js";import{b as S}from"./chunk-V2BBXFI7.js";import{I as N,L as z,N as T,S as H,g as O,i as L,j as I,l as b}from"./chunk-LPSJYQ4T.js";import{Ab as E,Cb as w,Db as C,Eb as y,Ib as v,Pa as c,Qa as U,ca as u,eb as _,gb as d,kb as a,lb as s,ma as k,mb as h,na as F,nb as x,pb as g,qb as p,rc as B,sc as V,ua as f,uc as D,va as m,yb as l,zb as P}from"./chunk-5J3ZMGMD.js";import"./chunk-FNBMN5FH.js";import{f as M}from"./chunk-CQCHLVVT.js";var K=e=>["/pages/editar-lenguaje",e],Q=e=>["/pages/ejercicio",e];function R(e,o){if(e&1&&(a(0,"button",10),l(1,"configuracion"),s()),e&2){let n=p();d("routerLink",v(1,K,n.idioma.id))}}function q(e,o){if(e&1){let n=x();a(0,"button",11),g("click",function(){f(n);let t=p();return m(t.compartir())}),l(1," a\xF1adir lenguaje compartido"),s()}}function X(e,o){if(e&1){let n=x();a(0,"button",11),g("click",function(){f(n);let t=p();return m(t.descompartir())}),l(1," quitar lenguaje compartido"),s()}}function Y(e,o){if(e&1&&(a(0,"div",4)(1,"div",12)(2,"a",10),h(3,"div",6),a(4,"div",7),l(5),s()()()()),e&2){let n=o.$implicit;c(2),d("routerLink",v(2,Q,n.id)),c(3),E(" ",n.nombre," ")}}function $(e,o){if(e&1){let n=x();a(0,"div",13)(1,"div",14)(2,"a",15),g("click",function(){f(n);let t=p();return m(t.showModal=!1)}),l(3,"\u2716"),s(),a(4,"h1"),l(5,"Crear nuevo Grupo de vocabulario"),s(),a(6,"input",16),y("ngModelChange",function(t){f(n);let i=p();return C(i.nameNew,t)||(i.nameNew=t),m(t)}),s(),a(7,"input",17),y("ngModelChange",function(t){f(n);let i=p();return C(i.col1New,t)||(i.col1New=t),m(t)}),s(),a(8,"input",18),y("ngModelChange",function(t){f(n);let i=p();return C(i.col2New,t)||(i.col2New=t),m(t)}),s(),h(9,"p"),a(10,"a",19),g("click",function(){f(n);let t=p();return m(t.create())}),l(11,"Crear grupo vocabulario"),s()()()}if(e&2){let n=p();c(6),w("ngModel",n.nameNew),c(),w("ngModel",n.col1New),c(),w("ngModel",n.col2New)}}var G=(()=>{let o=class o{constructor(r,t,i,A){this.ARoute=r,this.idiomaSV=t,this.gvSV=i,this.router=A,this.idioma=new J,this.listgv=[],this.showModal=!1,this.isUserPropietary=!1,this.hasUserAlreadyCompartido=!1}ngOnInit(){this.id=this.ARoute.snapshot.paramMap.get("lengid").replace(/%20/g," "),this.getIdioma(),this.getListaGV()}getIdioma(){return M(this,null,function*(){this.idioma=yield this.idiomaSV.getIdioma(this.id)})}getIdiomaUser(){this.idiomaSV.getListIdiomaUserByIdiomaandUser(this.idioma.id,localStorage.getItem("logUserID")).subscribe(r=>{this.hasUserAlreadyCompartido=!0,this.idiomauserid=r.id})}getListaGV(){this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe(r=>{debugger;this.idioma.user_id==localStorage.getItem("logUserID")&&(this.isUserPropietary=!0,this.getIdiomaUser()),this.listgv=r})}create(){this.gvSV.createGrupoVocabulario(this.id,this.nameNew,this.col1New,this.col2New),this.nameNew="",this.col1New="",this.col2New="",this.showModal=!1}compartir(){this.idiomaSV.createIdiomaUser(localStorage.getItem("logUserID"),this.idioma.id),this.hasUserAlreadyCompartido=!0}descompartir(){this.idiomaSV.deleteIdiomaUser(this.idiomauserid),this.hasUserAlreadyCompartido=!1}};o.\u0275fac=function(t){return new(t||o)(U(O),U(j),U(S),U(L))},o.\u0275cmp=k({type:o,selectors:[["app-lenguaje"]],decls:14,vars:6,consts:[[3,"routerLink",4,"ngIf"],[3,"click",4,"ngIf"],[1,"ag-format-container"],[1,"ag-courses_box"],[1,"ag-courses_item"],[1,"ag-courses-item_link",3,"click"],[1,"ag-courses-item_bg"],[1,"ag-courses-item_title"],["class","ag-courses_item",4,"ngFor","ngForOf"],["class","popup","id","popup",4,"ngIf"],[3,"routerLink"],[3,"click"],[1,"ag-courses-item_link"],["id","popup",1,"popup"],[1,"popup__content"],[1,"close",3,"click"],["type","text","placeholder","Nombre",3,"ngModelChange","ngModel"],["type","text","placeholder","Nombre columna 1",3,"ngModelChange","ngModel"],["type","text","placeholder","Nombre columna 2",3,"ngModelChange","ngModel"],[1,"accept",3,"click"]],template:function(t,i){t&1&&(a(0,"h1"),l(1),s(),_(2,R,2,3,"button",0)(3,q,2,0,"button",1)(4,X,2,0,"button",1),a(5,"div",2)(6,"div",3)(7,"div",4)(8,"a",5),g("click",function(){return i.showModal=!0}),h(9,"div",6),a(10,"div",7),l(11," A\xF1adir Grupo de Vocabulario "),s()()(),_(12,Y,6,4,"div",8),s()(),_(13,$,12,3,"div",9)),t&2&&(c(),P(i.idioma.nombre),c(),d("ngIf",i.isUserPropietary),c(),d("ngIf",!i.isUserPropietary&&!i.hasUserAlreadyCompartido),c(),d("ngIf",!i.isUserPropietary&&i.hasUserAlreadyCompartido),c(8),d("ngForOf",i.listgv),c(),d("ngIf",i.showModal))},dependencies:[B,V,I,N,z,T],styles:['@font-face{font-family:Poppins;font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJnecmNE.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLBT5Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.ag-format-container[_ngcontent-%COMP%]{width:1142px;margin:0 auto}a[_ngcontent-%COMP%]{text-decoration:none}body[_ngcontent-%COMP%]{background-color:#000}.ag-courses_box[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:50px 0}.ag-courses_item[_ngcontent-%COMP%]{-ms-flex-preferred-size:calc(33.33333% - 30px);flex-basis:calc(33.33333% - 30px);margin:0 15px 30px;overflow:hidden;border-radius:28px}.ag-courses-item_link[_ngcontent-%COMP%]{display:block;padding:30px 20px;background-color:#121212;overflow:hidden;position:relative}.ag-courses-item_link[_ngcontent-%COMP%]:hover, .ag-courses-item_link[_ngcontent-%COMP%]:hover   .ag-courses-item_date[_ngcontent-%COMP%]{text-decoration:none;color:#fff}.ag-courses-item_link[_ngcontent-%COMP%]:hover   .ag-courses-item_bg[_ngcontent-%COMP%]{-webkit-transform:scale(10);-ms-transform:scale(10);transform:scale(10)}.ag-courses-item_title[_ngcontent-%COMP%]{min-height:87px;margin:0 0 25px;overflow:hidden;font-weight:700;font-size:30px;color:#fff;z-index:2;position:relative}.ag-courses-item_date-box[_ngcontent-%COMP%]{font-size:18px;color:#fff;z-index:2;position:relative}.ag-courses-item_date[_ngcontent-%COMP%]{font-weight:700;color:#f9b234;-webkit-transition:color .5s ease;-o-transition:color .5s ease;transition:color .5s ease}.ag-courses-item_bg[_ngcontent-%COMP%]{height:128px;width:128px;background-color:#f9b234;z-index:1;position:absolute;top:-75px;right:-75px;border-radius:50%;-webkit-transition:all .5s ease;-o-transition:all .5s ease;transition:all .5s ease}.ag-courses_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#3ecd5e}.ag-courses_item[_ngcontent-%COMP%]:nth-child(3n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#e44002}.ag-courses_item[_ngcontent-%COMP%]:nth-child(4n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#952aff}.ag-courses_item[_ngcontent-%COMP%]:nth-child(5n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#cd3e94}.ag-courses_item[_ngcontent-%COMP%]:nth-child(6n)   .ag-courses-item_bg[_ngcontent-%COMP%]{background-color:#4c49ea}@media only screen and (max-width: 979px){.ag-courses_item[_ngcontent-%COMP%]{-ms-flex-preferred-size:calc(50% - 30px);flex-basis:calc(50% - 30px)}.ag-courses-item_title[_ngcontent-%COMP%]{font-size:24px}}@media only screen and (max-width: 767px){.ag-format-container[_ngcontent-%COMP%]{width:96%}}@media only screen and (max-width: 639px){.ag-courses_item[_ngcontent-%COMP%]{-ms-flex-preferred-size:100%;flex-basis:100%}.ag-courses-item_title[_ngcontent-%COMP%]{min-height:72px;line-height:1;font-size:24px}.ag-courses-item_link[_ngcontent-%COMP%]{padding:22px 40px}.ag-courses-item_date-box[_ngcontent-%COMP%]{font-size:16px}}a.close[_ngcontent-%COMP%]{width:30px;font-size:20px;color:#c0c5cb;align-self:flex-end;background-color:transparent;border:none;margin-bottom:10px;text-decoration:none}.some-text[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:800px;text-align:center;font-weight:500;font-size:24px}.pure[_ngcontent-%COMP%]{color:#e75480;text-decoration:underline;font-weight:600}a.accept[_ngcontent-%COMP%]{background-color:#ed6755;border:none;border-radius:5px;width:95%;align-items:center;padding:14px;font-size:16px;color:#fff;box-shadow:0 6px 18px -5px #ed6755;text-decoration:none}.popup[_ngcontent-%COMP%]{height:100vh;width:100%;position:fixed;top:0;left:0;background-color:#000c;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:9999;transition:all .3s}.popup__content[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20%;padding:20px;display:flex;flex-direction:column;background-color:#fff;box-shadow:0 2rem 4rem #0003;border-radius:10px;overflow:hidden}.popup__text[_ngcontent-%COMP%]{font-size:1.4rem;margin-bottom:4rem}']});let e=o;return e})();var tt=[{path:"",component:G}],W=(()=>{let o=class o{};o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=F({type:o}),o.\u0275inj=u({imports:[b.forChild(tt),b]});let e=o;return e})();var Ft=(()=>{let o=class o{};o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=F({type:o}),o.\u0275inj=u({imports:[D,W,H]});let e=o;return e})();export{Ft as LenguajeModule};