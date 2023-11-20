"use strict";(self.webpackChunkyoutube=self.webpackChunkyoutube||[]).push([[773],{7773:(S,m,l)=>{l.r(m),l.d(m,{AuthModule:()=>I});var a=l(6223),p=l(1115),d=l(3914),n=l(5879),h=l(4567),g=l(6814),v=l(8675);function _(t,s){1&t&&(n.TgZ(0,"small"),n._uU(1," Please enter a login email "),n.qZA())}function w(t,s){1&t&&(n.TgZ(0,"small"),n._uU(1," The login email is invalid "),n.qZA())}function C(t,s){if(1&t&&(n.TgZ(0,"div",9),n.YNc(1,_,2,0,"small",10),n.YNc(2,w,2,0,"small",10),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.getError("email","required")),n.xp6(1),n.Q6J("ngIf",e.getError("email","email"))}}function Z(t,s){1&t&&(n.TgZ(0,"small"),n._uU(1," Please enter a password. "),n._UZ(2,"br"),n.qZA())}function b(t,s){if(1&t&&(n.TgZ(0,"small"),n._uU(1," Your password isn't strong enough. "),n._UZ(2,"br"),n._uU(3),n.qZA()),2&t){const e=n.oxw(2);n.xp6(3),n.hij(" Recommendations: ",null==e.password||null==e.password.errors?null:e.password.errors.message," ")}}function P(t,s){if(1&t&&(n.TgZ(0,"div",9),n.YNc(1,Z,3,0,"small",10),n.YNc(2,b,4,1,"small",10),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.getError("password","required")),n.xp6(1),n.Q6J("ngIf",e.getError("password","strongPassword"))}}const c=function(t){return{invalid:t}},T=[{path:"",component:(()=>{class t{constructor(e,i){this.authService=e,this.router=i,this.isSubmitted=!1}ngOnInit(){this.form=new a.cw({email:new a.NI("",[a.kI.required,a.kI.email]),password:new a.NI("",[a.kI.required,t=>{const{value:s}=t,e=s?.length>=8,i=/[a-z]/.test(s)&&/[A-Z]/.test(s),o=/\d/.test(s)&&/[a-zA-Z]/.test(s),u=/[!@#?]/.test(s);if(e&&i&&o&&u)return null;let r="";return e||(r+="at least 8 characters, "),i||(r+="a mixture of both uppercase and lowercase letters, "),o||(r+="a mixture of letters and numbers, "),u||(r+="inclusion of at least one special character, e.g., ! @ # ? "),{strongPassword:!0,message:r}}])})}get email(){return this.form.get("email")}get password(){return this.form.get("password")}onSubmit(){if(this.form.invalid)return;this.isSubmitted=!0;const{email:e,password:i}=this.form.value;this.authService.login(e,i)?this.handleSuccessfulLogin():this.handleFailedLogin()}handleSuccessfulLogin(){this.form.reset(),this.isSubmitted=!1,this.router.navigate(["/youtube"])}handleFailedLogin(){this.isSubmitted=!1}getError(e,i){return this.form.get(e)?.hasError(i)}static#n=this.\u0275fac=function(i){return new(i||t)(n.Y36(h.e),n.Y36(d.F0))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["app-login-page"]],decls:15,vars:10,consts:[[1,"login",3,"formGroup","ngSubmit"],[1,"login__title"],[1,"login__control",3,"ngClass"],["for","email"],["id","email","type","email","formControlName","email","autocomplete","email"],["class","validation",4,"ngIf"],["for","password"],["id","password","type","password","formControlName","password","autocomplete","current-password",3,"input"],["additionalClasses","login__button-submit","type","submit",3,"disabled"],[1,"validation"],[4,"ngIf"]],template:function(i,o){1&i&&(n.TgZ(0,"form",0),n.NdJ("ngSubmit",function(){return o.onSubmit()}),n.TgZ(1,"h2",1),n._uU(2,"Login"),n.qZA(),n.TgZ(3,"div",2)(4,"label",3),n._uU(5,"login"),n.qZA(),n._UZ(6,"input",4),n.YNc(7,C,3,2,"div",5),n.qZA(),n.TgZ(8,"div",2)(9,"label",6),n._uU(10," password "),n.qZA(),n.TgZ(11,"input",7),n.NdJ("input",function(){return null==o.password?null:o.password.markAsTouched()}),n.qZA(),n.YNc(12,P,3,2,"div",5),n.qZA(),n.TgZ(13,"app-custom-button",8),n._uU(14," Login "),n.qZA()()),2&i&&(n.Q6J("formGroup",o.form),n.xp6(3),n.Q6J("ngClass",n.VKq(6,c,(null==o.email?null:o.email.touched)&&(null==o.email?null:o.email.invalid))),n.xp6(4),n.Q6J("ngIf",(null==o.email?null:o.email.touched)&&(null==o.email?null:o.email.invalid)),n.xp6(1),n.Q6J("ngClass",n.VKq(8,c,(null==o.password?null:o.password.touched)&&(null==o.password?null:o.password.invalid))),n.xp6(4),n.Q6J("ngIf",(null==o.password?null:o.password.touched)&&(null==o.password?null:o.password.invalid)),n.xp6(1),n.Q6J("disabled",o.form.invalid||o.isSubmitted))},dependencies:[a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,g.mk,g.O5,v.x],styles:[".login[_ngcontent-%COMP%]{max-width:600px;margin:0 auto;padding:2rem 1.5rem;background-color:#efefef;border-radius:10px}.login__title[_ngcontent-%COMP%]{margin-bottom:1rem}.login__control[_ngcontent-%COMP%]{color:#888}.login__control[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-left:.5rem;margin-top:1rem}.login__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:3rem;border-color:transparent;background-color:var(--background);transition:border-color .3s;outline-color:var(--primary);margin:.3rem auto;padding:1rem}.validation[_ngcontent-%COMP%], .invalid[_ngcontent-%COMP%]{color:var(--danger-color)}.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid var(--danger-color);outline-color:var(--danger-color)}"]})}return t})()}];let A=(()=>{class t{static#n=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=n.oAB({type:t});static#o=this.\u0275inj=n.cJS({imports:[d.Bz.forChild(T),d.Bz]})}return t})();var L=l(6500),J=l(3512);let I=(()=>{class t{static#n=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=n.oAB({type:t});static#o=this.\u0275inj=n.cJS({providers:[L.d,J.f],imports:[a.UX,p.m,A]})}return t})()}}]);