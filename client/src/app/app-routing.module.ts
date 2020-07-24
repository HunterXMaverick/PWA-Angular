import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path:'',redirectTo: '/login', pathMatch: 'full'},
  { path: 'login',  component: LoginComponent },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) }
  ]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
