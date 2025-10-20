import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class PagesComponent implements OnInit {
  expanded: boolean = false;
 userRol: string | null = null;
       

  constructor(
    private userSV:UserService,
    private router:Router
    ){}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
         this.userRol = localStorage.getItem("rol_Id");
      }
  }
  logOut(){
    //cerrarsesion
    this.userSV.logout();
    this.router.navigate(['/']);
  }
}
