import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PermisosService } from '../servicio/permisos.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements CanActivate{

  constructor(
    public auth: PermisosService,
    public router: Router) {}

    canActivate(){
      if(this.auth.isAuthenticated()){
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}
