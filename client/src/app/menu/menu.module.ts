import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AutenticaGuardarService } from '../guard/autentica-guardar.service'
import { TokenService } from '../guard/token.service'


@NgModule({
  declarations: [MenuComponent, UsuarioComponent, RegistroUsuarioComponent, EditarUsuarioComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [AutenticaGuardarService, TokenService]
})
export class MenuModule { }
