import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user-service.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {
  //new admin
  newEmail:any;
  newPass:any;
  //make admin
  userNoAdmins:any=[];
  userNoAdminsFiltered:any=[];
  adminElegido:any;
  //takeout admin
  userAdmins:any=[];
  userAdminsFiltered:any=[];
  userAdminElegido:any;
  //bloqUser
  userNoBloq:any=[];
  userNoBloqFiltered:any=[];
  userNoBloqElegido:any;
  //desbloqUser
  userBloq:any=[];
  userBloqFiltered:any=[];
  userBloqElegido:any;
  constructor(
    private userSV: UserService
  ){}
  ngOnInit() {
    this.getUserBloq();
    this.getUserAdmin();
    this.getUserNoAdmin();
    this.getUserNoBLoq();
  }

  onKeyNoBloq(value:any) { 
    this.userBloqFiltered = this.searchNoBloq(value.target.value);
    }

    searchNoBloq(value: string) { 
      let filter = value.toLowerCase();
      return this.userBloq.filter((option:any) => option.email.toLowerCase().startsWith(filter));
    }

    onKeyBloq(value:any) { 
      this.userNoBloqFiltered = this.searchBloq(value.target.value);
      }
  
      searchBloq(value: string) { 
        let filter = value.toLowerCase();
        return this.userNoBloq.filter((option:any) => option.email.toLowerCase().startsWith(filter));
      }

      onKeyAdmin(value:any) { 
        this.userNoAdminsFiltered = this.searchAdmin(value.target.value);
        }
    
        searchAdmin(value: string) { 
          let filter = value.toLowerCase();
          return this.userNoAdmins.filter((option:any) => option.email.toLowerCase().startsWith(filter));
        }

        onKeyNoAdmin(value:any) { 
          this.userAdminsFiltered = this.searchNoAdmin(value.target.value);
          }
      
          searchNoAdmin(value: string) { 
            let filter = value.toLowerCase();
            return this.userAdmins.filter((option:any) => option.email.toLowerCase().startsWith(filter));
          }

  async getUserBloq(){
    await this.userSV.getListUsersBloq().subscribe((res)=>{
      this.userBloq=res;
      this.userBloqFiltered=res;
    })
  }

  async getUserNoBLoq(){
    await this.userSV.getListUsersNoBloq().subscribe((res)=>{
      this.userNoBloq=res;
      this.userNoBloqFiltered=res;
    })
  }


  
  async getUserAdmin(){
    await this.userSV.getListUsersAdmins().subscribe((res)=>{
      this.userAdmins=res;
      this.userAdminsFiltered=res;
    })
  }

  async getUserNoAdmin(){
    await this.userSV.getListUsersNoAdmins().subscribe((res)=>{
      this.userNoAdmins=res;
      this.userNoAdminsFiltered=res;
    })
  }

  async newAdmin(){
    await this.userSV.createUser(this.newPass,this.newEmail,"1");
  }

  changeToAdmin(event:any){
    this.userSV.AdminUser(event.value.id,"1");
    this.adminElegido="";
  }

  changeToUser(event:any){
    this.userSV.AdminUser(event.value.id,"2");
    this.userAdminElegido="";
  }
  desbloquear(event:any){
    this.userSV.bloquearUser(event.value.id,0);
    this.userBloqElegido="";
  }
  bloquear(event:any){
    this.userSV.bloquearUser(event.value.id,1);
    this.userNoBloqElegido="";
  }

}
