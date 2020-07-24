import { Injectable } from '@angular/core';
import { CanActivate, Router, Route } from '@angular/router';
import { PermisosService } from '../servicio/permisos.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticaGuardarService implements CanActivate{

  constructor(public auth: PermisosService, public router: Router) { }

  canActivate() {
    if (this.auth.getUserRol()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
