import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore
) {
     
     }
private http = inject(HttpClient);
   private API = 'http://localhost:8001/users';
private AUTH = 'http://localhost:8001/auth';

public login(email: string, pass: string) {
  return this.http.post(`${this.AUTH}/login`, {email, password: pass });
}

public createUser(email: string, pass: string, rol: string) {
  var id = String(Date.now());
  return this.http.post(`${this.AUTH}/register`, {
    id :id,
    email: email,
    password: pass,
    role_id: rol,
    bloqued: 0
  });
}


public getListUsersBloq() {
  return this.http.get(`${this.API}/bloqueados`);
}
public getListUsersNoBloq() {
  return this.http.get(`${this.API}/no_bloqueados`);
}
public getListUsersAdmins() {
  return this.http.get(`${this.API}/admins`);
}
public getListUsersNoAdmins() {
  return this.http.get(`${this.API}/no_admins`);
}

editUser(id: string, email: string, pass: string, bloqued: number) {
  return this.http.put(`${this.API}/${id}`, {
    email: email,
    password: pass,
    bloqued: bloqued
  });
}

public bloquearUser(id: string, tipoBloqueo: number) {
  return this.http.put(`${this.API}/bloquear/${id}?tipo_bloqueo=${tipoBloqueo}`, {});
}


public AdminUser(id: string, rol: string) {
  return this.http.put(`${this.API}/${id}/rol?role_id=${rol}`, {});
}
public deleteUser(id: string) {
  return this.http.delete(`${this.API}/${id}`);
}
public changeRole(id: string, newRole: string) {
  return this.http.put(`${this.API}/${id}/rol`, { role_id: newRole });
}
 // GUARDAR USER LOGUEADO
 // Guardar usuario logueado
setLoggedUser(user: User) {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('logUserID', user.id);
    localStorage.setItem('isLoginRegister', 'true');
    localStorage.setItem('rol_Id', user.role_id);
  }
}

// Obtener usuario logueado
getLoggedUser(): User | null {
  if (typeof window !== 'undefined' && localStorage) {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}
getLoggedROL(): User | null {
  if (typeof window !== 'undefined' && localStorage) {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

// Cerrar sesión
logout() {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.clear();
  }
}


}
export class User{
  id:string="";
  password:string="";
  email:string="";
bloqued:number=0;
role_id:string="";
 }