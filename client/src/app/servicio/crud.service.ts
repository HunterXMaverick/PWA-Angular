import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { DataRx } from '../modelos/data-rx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url: string;

  constructor(
    private http: HttpClient,
    private servidor: WebServiceService,
    private permisos: PermisosService
  ) {
    this.url = servidor.getUrl()
  }

  insert(endPoint: string, dataInsert: object): Array<any> {
    let returndata: Array<any> = [];
    this.http.post<DataRx>(`${this.url}${endPoint}`, dataInsert, this.servidor.getHeaders())
      .subscribe(data => {
        if (data.transaccion) {
          returndata = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: `${data.msg}`,
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    return returndata
  }

  delete(endPoint: string, id: string): Array<any> {
    let returndata: Array<any> = [];
    this.http.delete<DataRx>(`${this.url}${endPoint}/${id}`, this.servidor.getHeaders1())
      .subscribe((data) => {
        if (data.transaccion) {
          returndata = data.data;
          this.permisos.decodeToken(data.token)
        } else {
          alert(data.msg)
        }
      });
    return returndata;
  }

  update(endPoint: string, id: string, data: object): Array<any> {
    let returndata: Array<any> = [];
    this.http.put<DataRx>
    (`${this.url}${endPoint}/${id}`, data, 
    this.servidor.getHeaders1())
      .subscribe((data) => {
        console.log(data)
        if (data.transaccion) {
          returndata = data.data;
        } else {
        }
      });
    return returndata;
  }
}
