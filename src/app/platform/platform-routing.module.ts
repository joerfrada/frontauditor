import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComponent } from './platform.component'
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../modulos/home/home.component';
import { UsuariosComponent } from '../modulos/admin/usuarios/usuarios.component';
import { RolesComponent } from '../modulos/admin/roles/roles.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auditor', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'admin/usuarios', component: UsuariosComponent },
    { path: 'admin/roles', component: RolesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
