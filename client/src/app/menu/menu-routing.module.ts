import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AutenticaGuardarService } from '../guard/autentica-guardar.service';
import { TokenService } from '../guard/token.service';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AutenticaGuardarService, TokenService] },
  //{ path: '', component: MenuComponent },
  {path: 'usuarios', component:UsuarioComponent},
  {path: 'registrar-usuarios', component:RegistroUsuarioComponent},
  {path: 'editar-usuario', component:EditarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
