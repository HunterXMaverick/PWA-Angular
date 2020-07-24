import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { CrudService } from '../../servicio/crud.service';
import { PermisosService } from '../../servicio/permisos.service';
import { DataRx } from '../../modelos/data-rx';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilesService } from '../../servicio/files.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  providers: [NgxSpinnerService]
})
export class RegistroUsuarioComponent implements OnInit {
  crearUsuarioForm: FormGroup;
  navigationSubcription;
  verFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cudService: CrudService,
    private permisosService: PermisosService,
    private spinner: NgxSpinnerService,
    private fileService: FilesService
  ) {
    this.navigationSubcription = this.router.events.subscribe((err: any) => {
      if (err instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
  }

  changeFile(event): void {
    let imagen = this.crearUsuarioForm.get('file').value;
    if (imagen !== 'lX-3cRGnJ4iBzjK-Ftpo8Nen.jpg') {
      this.fileService.delete('galeria', imagen);
    }
    const filename = event.target.files;
    console.log(filename)
    this.fileService.saveFile(filename).subscribe((data: DataRx) => {
      console.log(data)
      if (data.transaccion) {
        imagen = data.data[0];
        console.log(imagen)
        this.verFile = this.fileService.getFile('galeria', imagen)
      }
    })
  }

  ngOnInit(): void {
    this.crearUsuarioForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      verifypassword: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
    this.verFile = this.fileService.getFile(
      'galeria',
      'lX-3cRGnJ4iBzjK-Ftpo8Nen.jpg'
    );
  }
  crearUsuario() {
    let name = this.crearUsuarioForm.get('name').value;
    let lastname = this.crearUsuarioForm.get('lastname').value;
    let age = this.crearUsuarioForm.get('age').value;
    let email = this.crearUsuarioForm.get('email').value;
    let password = this.crearUsuarioForm.get('password').value;
    let rol = this.crearUsuarioForm.get('rol').value;
    let verifypassword = this.crearUsuarioForm.get('verifypassword').value;
    if (this.crearUsuarioForm.valid) {
      if (password != verifypassword) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No conisiden las contraseñas',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        let datos = {
          data: {
            name,
            lastname,
            age,
            email,
            password,
            rol,
          },
        };
        let user = this.cudService.insert('insert', datos);
        if (user) {
          this.router.navigate(['/menu/usuarios']);
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

}
