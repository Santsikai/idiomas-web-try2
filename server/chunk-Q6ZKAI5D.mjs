import './polyfills.server.mjs';
import{a as F}from"./chunk-S54HXTPA.mjs";import{a as T,b,c as L,d as W,e as V,f as k}from"./chunk-DIODED5F.mjs";import"./chunk-UTEJNEE6.mjs";import{B as v,G as U,z as M}from"./chunk-TLNNSNR4.mjs";import{p as B}from"./chunk-ULOEEDMH.mjs";import{Ab as u,Ac as w,Cb as f,Eb as _,Fb as y,Gb as A,Ra as l,Sa as S,ca as C,gb as g,ib as p,ma as N,mb as r,na as q,nb as s,rb as c,xc as E}from"./chunk-WAP4PGVX.mjs";import"./chunk-B5JBQX2M.mjs";import"./chunk-3SZVCSKE.mjs";import{j as h}from"./chunk-H6KHSOBK.mjs";function j(o,n){if(o&1&&(r(0,"mat-option",3),u(1),s()),o&2){let m=n.$implicit;p("value",m.id),l(),f(" ",m.email," ")}}function P(o,n){if(o&1&&(r(0,"mat-option",3),u(1),s()),o&2){let m=n.$implicit;p("value",m.id),l(),f(" ",m.email," ")}}function D(o,n){if(o&1&&(r(0,"mat-option",3),u(1),s()),o&2){let m=n.$implicit;p("value",m.id),l(),f(" ",m.email," ")}}function H(o,n){if(o&1&&(r(0,"mat-option",3),u(1),s()),o&2){let m=n.$implicit;p("value",m.id),l(),f(" ",m.email," ")}}var K=(()=>{let n=class n{constructor(e){this.userSV=e,this.userNoAdmins=[],this.userNoAdminsFiltered=[],this.userAdmins=[],this.userAdminsFiltered=[],this.userNoBloq=[],this.userNoBloqFiltered=[],this.userBloq=[],this.userBloqFiltered=[]}ngOnInit(){this.getUserBloq(),this.getUserAdmin(),this.getUserNoAdmin(),this.getUserNoBLoq()}onKeyNoBloq(e){this.userBloqFiltered=this.searchNoBloq(e.target.value)}searchNoBloq(e){let a=e.toLowerCase();return this.userBloq.filter(t=>t.email.toLowerCase().startsWith(a))}onKeyBloq(e){this.userNoBloqFiltered=this.searchBloq(e.target.value)}searchBloq(e){let a=e.toLowerCase();return this.userNoBloq.filter(t=>t.email.toLowerCase().startsWith(a))}onKeyAdmin(e){this.userNoAdminsFiltered=this.searchAdmin(e.target.value)}searchAdmin(e){let a=e.toLowerCase();return this.userNoAdmins.filter(t=>t.email.toLowerCase().startsWith(a))}onKeyNoAdmin(e){this.userAdminsFiltered=this.searchNoAdmin(e.target.value)}searchNoAdmin(e){let a=e.toLowerCase();return this.userAdmins.filter(t=>t.email.toLowerCase().startsWith(a))}getUserBloq(){return h(this,null,function*(){yield this.userSV.getListUsersBloq().subscribe(e=>{this.userBloq=e,this.userBloqFiltered=e})})}getUserNoBLoq(){return h(this,null,function*(){yield this.userSV.getListUsersNoBloq().subscribe(e=>{this.userNoBloq=e,this.userNoBloqFiltered=e})})}getUserAdmin(){return h(this,null,function*(){yield this.userSV.getListUsersAdmin().subscribe(e=>{this.userAdmins=e,this.userAdminsFiltered=e})})}getUserNoAdmin(){return h(this,null,function*(){yield this.userSV.getListUsersNoAdmin().subscribe(e=>{this.userNoAdmins=e,this.userNoAdminsFiltered=e})})}newAdmin(){return h(this,null,function*(){yield this.userSV.createUser(this.newPass,this.newEmail,"1")})}changeToAdmin(e){this.userSV.AdminUser(e.value.id,"1"),this.adminElegido=""}changeToUser(e){this.userSV.AdminUser(e.value.id,"2"),this.userAdminElegido=""}desbloquear(e){this.userSV.bloquearUser(e.value.id,0),this.userBloqElegido=""}bloquear(e){this.userSV.bloquearUser(e.value.id,1),this.userNoBloqElegido=""}};n.\u0275fac=function(a){return new(a||n)(S(F))},n.\u0275cmp=N({type:n,selectors:[["app-administracion"]],decls:26,vars:8,consts:[[3,"ngModelChange","selectionChange","ngModel"],[3,"keyup"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(a,t){a&1&&(r(0,"h1"),u(1,"Administracion"),s(),r(2,"mat-form-field")(3,"mat-label"),u(4,"Bloquear User"),s(),r(5,"mat-select",0),A("ngModelChange",function(i){return y(t.userNoBloqElegido,i)||(t.userNoBloqElegido=i),i}),c("selectionChange",function(i){return t.bloquear(i)}),r(6,"input",1),c("keyup",function(i){return t.onKeyBloq(i)}),s(),g(7,j,2,2,"mat-option",2),s()(),r(8,"mat-form-field")(9,"mat-label"),u(10,"Desbloquear User"),s(),r(11,"mat-select",0),A("ngModelChange",function(i){return y(t.userBloqElegido,i)||(t.userBloqElegido=i),i}),c("selectionChange",function(i){return t.desbloquear(i)}),r(12,"input",1),c("keyup",function(i){return t.onKeyNoBloq(i)}),s(),g(13,P,2,2,"mat-option",2),s()(),r(14,"mat-form-field")(15,"mat-label"),u(16,"Hacer administrador a un usuario"),s(),r(17,"mat-select",0),A("ngModelChange",function(i){return y(t.adminElegido,i)||(t.adminElegido=i),i}),c("selectionChange",function(i){return t.changeToAdmin(i)}),r(18,"input",1),c("keyup",function(i){return t.onKeyAdmin(i)}),s(),g(19,D,2,2,"mat-option",2),s()(),r(20,"mat-form-field")(21,"mat-label"),u(22,"Deshacer administrador a un usuario"),s(),r(23,"mat-select",0),A("ngModelChange",function(i){return y(t.userAdminElegido,i)||(t.userAdminElegido=i),i}),c("selectionChange",function(i){return t.changeToUser(i)}),r(24,"input",1),c("keyup",function(i){return t.onKeyNoAdmin(i)}),s(),g(25,H,2,2,"mat-option",2),s()()),a&2&&(l(5),_("ngModel",t.userNoBloqElegido),l(2),p("ngForOf",t.userNoBloqFiltered),l(4),_("ngModel",t.userBloqElegido),l(2),p("ngForOf",t.userBloqFiltered),l(4),_("ngModel",t.adminElegido),l(2),p("ngForOf",t.userNoAdminsFiltered),l(4),_("ngModel",t.userAdminElegido),l(2),p("ngForOf",t.userAdminsFiltered))},dependencies:[E,L,b,V,T,M,v]});let o=n;return o})();var z=[{path:"",component:K}],O=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=q({type:n}),n.\u0275inj=C({imports:[B.forChild(z),B]});let o=n;return o})();var me=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=q({type:n}),n.\u0275inj=C({imports:[w,O,k,W,U]});let o=n;return o})();export{me as AdministracionModule};
