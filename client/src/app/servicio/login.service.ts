import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { DataRx } from '../modelos/data-rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string; 

  constructor(
    private http: HttpClient,
    private server: WebServiceService
  ) { 
    this.url = server.getUrl();
  }
  
  login(datalogin: { data: {password: any, email: any}}):Observable<DataRx>{
     return this.http.post<DataRx>(`${this.url}login`, datalogin);
     }

}
