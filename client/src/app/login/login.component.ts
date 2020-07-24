import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisosService } from '../servicio/permisos.service'
import { DataRx } from '../modelos/data-rx'
import { LoginService } from '../servicio/login.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;
  constructor(
    private loginServices:LoginService,
    private permisos: PermisosService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
     email:["admin@admin.com",Validators.required],
     password:["1234",Validators.required],
 });
  }
  login():void{
    let email =this.loginData.get('email').value;
    let password =this.loginData.get('password').value;
    let datalogin = {
      data:{
        password,
        email
      }
    };
      this.loginServices.login(datalogin).subscribe((data:DataRx)=>{
    if(data.transaccion){
      if(this.permisos.decodeToken(data.token)){
        this.router.navigate(['/menu']);
      }else{
       email='';
        password='';
        Swal.fire({
          position: 'top-right',
          icon:'error',
          title:`${data.msg}`,
          showConfirmButton: false,
          timer: 3000
        });
      }
    } (error:String)=>{
      email='';
        password='';
    Swal.fire({
        position: 'top-right',
        icon:'error',
        title:`${error}`,
        showConfirmButton: false,
        timer: 3000
      });
    };
  });
  }
}