import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { DataRx } from '../modelos/data-rx';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private url: string;


  constructor(
    private http: HttpClient,
    private servidor: WebServiceService,
    private permisos: PermisosService
  ) {
    this.url = servidor.getUrl()
  }

  saveFile(file: File[]): Observable<DataRx> {
    const formData = new FormData();
    formData.append('uploadFile', file[0], file[0].name);
    console.log(formData);
    return this.http.post<DataRx>(`${this.url}upload_galeria`, formData, this.servidor.getHeaderFile());
  }

  getFile(directorio: string, fileNombre: string): any {
    return(`${this.url}file_galeria/${directorio}/${fileNombre}`)
  }

  delete(endPoint: string, _id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .delete<DataRx>(`${this.url}${endPoint}/${_id}`, this.servidor.getHeaders())
      .subscribe((data) => {
        if (data.transaccion) {
          returnData = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
}
