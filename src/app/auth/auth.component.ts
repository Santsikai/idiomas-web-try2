import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../services/users/user-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email = '';
  password = '';
  passwordc = '';
  emailEnvio = '';

  showAlertBloqueado = false;
  showAlertAdmin = false;
  showAlertPassNoCoincide = false;
  userselectedbl: any;

  constructor(private userSV: UserService, private router: Router) {}

  ngOnInit() {
    const user = this.userSV.getLoggedUser();
    if (user) this.router.navigate(['/pages']);
  }

  login() {
    this.userSV.login(this.email, this.password).subscribe({
      next: (res: any) => {
        const user = res as User;

        if (user.bloqued === 0) {
          this.userSV.setLoggedUser(user);
          this.router.navigate(['/pages']);
        } else if (user.bloqued === 1) {
          this.userselectedbl = user.id;
          this.showAlertBloqueado = true;
        } 
      },
      error: (err) => {
          if (err.error.detail === 'bloqued by admin') {
          this.showAlertAdmin = true;
        }else{
        window.alert('Credenciales incorrectas');
        }
      }
    });
  }

  desblock() {
    this.userSV.bloquearUser(this.userselectedbl, 0).subscribe(() => {
      this.router.navigate(['/pages']);
    });
  }

  register() {
    if (this.password !== this.passwordc) {
      this.showAlertPassNoCoincide = true;
      return;
    }

    this.userSV.createUser(this.email, this.password, '2').subscribe({
      next: (res: any) => {
        this.userSV.setLoggedUser(res as User);
        this.router.navigate(['/pages']);
      },
      error: (err) => {
        let msg = err?.error?.detail || err?.message || JSON.stringify(err);
        window.alert('Error al registrar: ' + msg);
      }
    });
  }

  confirm() {
    // Si implementas reset en backend:
    // this.userSV.resetPassword(this.emailEnvio).subscribe(...)
    window.alert('Función de recuperación pendiente en backend');
  }
}
