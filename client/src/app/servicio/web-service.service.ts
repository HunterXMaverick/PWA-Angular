import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PermisosService } from './permisos.service';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  private url: string;

  constructor(private permisos: PermisosService) {
    this.url = 'http://localhost:3500/api/'
  }

  getUrl(): string {
    return this.url;
  }

  getHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permisos.getToken(),
      })
    };
    return optionsHeaders;
  }

  getHeaders1(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permisos.getToken(),
      })
    };
    return optionsHeaders;
  }

  getHeaderFile(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: this.permisos.getToken(),
      }),
    };
    return optionsHeaders;
  }
}
