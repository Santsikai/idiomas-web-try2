import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioAccessGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var langUserID = null;
       if (typeof window !== 'undefined' && localStorage) {
         langUserID = localStorage.getItem("langUserID");
      }

  var logUserID = null;
       if (typeof window !== 'undefined' && localStorage) {
         logUserID = localStorage.getItem("logUserID");
      }
      // Verifica si el usuario es el propietario del idioma o si el idioma es privado
      if (langUserID==logUserID) {
        return true; // Permite el acceso
      } else {
        // Redirige a una página de acceso denegado o a otra página según sea necesario
        return false;
      }
  }
  
}
