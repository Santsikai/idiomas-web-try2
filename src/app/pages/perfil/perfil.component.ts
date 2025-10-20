import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/users/user-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  edit=true;
  user: User = new User();
  constructor(
    private userSV:UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  async getUserData(){
    this.user= await this.userSV.getLoggedUser()!;
  }
  editUser(){
    this.userSV.editUser(this.user.id,this.user.email, this.user.password,this.user.bloqued).subscribe((res)=>{
      this.edit=true;
    }); 
    
  }
  bloqUser(){
    this.userSV.bloquearUser(this.user.id,1).subscribe((res)=>{
    this.userSV.logout();
    this.router.navigate(['/']);
    }
    );
    
  }
  allowEdit(){
    this.edit=false;
  }

}
