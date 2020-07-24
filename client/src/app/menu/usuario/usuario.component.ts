import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../servicio/crud.service';
import { PermisosService } from '../../servicio/permisos.service';
import { WebServiceService } from '../../servicio/web-service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [NgxSpinnerService]
})
export class UsuarioComponent implements OnInit {
  usuario = [];
  navigationSubcription;
  private url: string;

  constructor(
    private crudService: CrudService,
    private permisosService: PermisosService,
    private servidor: WebServiceService,
    private permisos: PermisosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.url = servidor.getUrl();
    this.navigationSubcription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.http.get(`${this.url}usuarios`)
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.usuario.push(element);
        });
      });
  }

  public editar(usuario): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/menu/editar-usuario'])
  }

  borrarUsuario(_id) {
    console.log(_id)
    this.crudService.delete('usuario_delete', _id);
    this.navigationSubcription = this.router.events.subscribe((err: any) => {
      if (err instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
  }

}
