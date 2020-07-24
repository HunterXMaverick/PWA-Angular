import { Injectable } from '@angular/core';
import { Usuario} from '../modelos/usuario';
import {DataRx} from '../modelos/data-rx';
import * as jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  dataRx: DataRx;
  private token: string;
  private usuarioLogin: Usuario;
  private sessionID: string;
  private rol: string;
  public jwtHelper: JwtHelperService;

  constructor() {
    this.token = null;
    this.usuarioLogin = null;
   }

   decodeToken(token: string): boolean {
     const decoded = jwt_decode(token);
     if(decoded){
       this.token = token || null;
       this.usuarioLogin= decoded.data || null;
       this.sessionID = this.usuarioLogin.sessionID || null;
       this.rol = this.usuarioLogin.rol
       console.log(this.sessionID);
       console.log(this.usuarioLogin);
       delete this.usuarioLogin.sessionID;
       delete this.usuarioLogin.password;
       return true;
     }else {
       return false
     }
   }

   public isAuthenticated(): boolean {
     return this.token === null;
     console.log(this.token)
   }

   getToken(): string {
    return this.token;
  }

  destroyToken(): void {
    this.token = null;
  }

  getUserLogin(): object {
    return this.usuarioLogin;
  }

  getUserRol(): boolean {
    return this.rol != "admin";
  }

  getSessionID(): string {
    return this.sessionID;
  }
}
