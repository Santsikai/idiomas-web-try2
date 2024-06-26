import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  constructor(
    @Inject(UserService) private userSV: UserService, 
    private router: Router,
    ){}
  email:string="";
  password:string="";
  passwordc:string="";
  iduserbloq:any;
  iduserrol:any;
  showAlertbbu=false;
  showAlertbba=false;
  showAlertbbanoigualpass=false;
  EmailEnvio="";
  ngOnInit() {
    this.getuserLogged();
  }
  async getuserLogged(){
    let a=await this.userSV.getLoggedUser();
    if(a){
      localStorage.setItem("logUserID",a.uid);
      localStorage.setItem("isLoginRegister","true");
          this.router.navigate(['/pages']);
    }
  }
  async login(){
    this.userSV.login(this.email,this.password)      
    .then(async (res:any) => {
    await this.userSV.getUserByEmailandPass(this.email,this.password).subscribe((r:any)=>{
      if(r[0].bloqued==0){
          localStorage.setItem("logUserID",res.user.uid);
          localStorage.setItem("isLoginRegister","true");
          localStorage.setItem("rol_Id",r[0].role_id);
          this.router.navigate(['/pages']);
    }
    else if( r[0].bloqued==1){
      //show alert de la cuenta ha sido bloqueada por el usuario
      this.iduserbloq=r[0].id;
      this.iduserrol=r[0].role_id;
      this.showAlertbbu = true;
    }
    else if(r[0].bloqued==2){
      this.userSV.SignOut();
      //show alert de la cuenta ha sido bloqueada por los administradores
      this.showAlertbba = true;//this.presentAlertTotalBlok();
    }
  
})
}).catch((error:any) => {
    
  window.alert('Fallo al introducir los datos')
})
  }
  desblock(){
    this.userSV.bloquearUser(this.iduserbloq,0);
          localStorage.setItem("logUserID",this.iduserbloq);
          localStorage.setItem("isLoginRegister","true");
          localStorage.setItem("rol_Id",this.iduserrol);
          this.router.navigate(['/pages']);
  }


  register(){
    if(this.password==this.passwordc){
      this.userSV.createUser(this.password,this.email,"2")      
      .then((res) => {
        localStorage.setItem("logUserID",res.id);
        localStorage.setItem("isLoginRegister","true");
        localStorage.setItem("rol_Id","2");
        this.router.navigate(['/pages']);
      }).catch((error) => {
        window.alert(error.message)
      })
    }else{
        window.alert("las constraseñas no coinciden")
      }
  }

  confirm() {
    this.userSV.ForgotPassword(this.EmailEnvio);

  }
}
