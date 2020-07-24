import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../servicio/crud.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {
  usuario: any;
  crearUsuarioForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private CrudService: CrudService
  ) {
    if (sessionStorage.getItem("usuario")) {
      this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
      console.log(this.usuario)
    }
  }

  ngOnInit(): void {
    this.crearUsuarioForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  update() {
    let name = this.crearUsuarioForm.get('name').value;
    let lastname = this.crearUsuarioForm.get('lastname').value;
    let age = this.crearUsuarioForm.get('age').value;
    let email = this.crearUsuarioForm.get('email').value;
    let rol = this.crearUsuarioForm.get('rol').value;
    if (this.crearUsuarioForm.invalid) {
      console.log(this.crearUsuarioForm)
    } else {
      let dato = {
        data: {
          name,
          lastname,
          age,
          email,
          rol,
        },
      };
      let user = this.CrudService.update(
        'update', this.usuario._id, dato);
      if (user) {
        console.log(this.usuario._id)
        console.log(dato)
        this.router.navigate(['/menu/usuarios']);
        localStorage.clear();
      }
    }
  }
}
