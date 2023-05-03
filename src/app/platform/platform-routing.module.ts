import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComponent } from './platform.component'
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../modulos/home/home.component';
import { UsuariosComponent } from '../modulos/admin/usuarios/usuarios.component';
import { RolesComponent } from '../modulos/admin/roles/roles.component';
import { UnidadesComponent } from '../modulos/admin/unidades/unidades.component';
import { CriterioComponent } from '../modulos/param/criterio/criterio.component';
import { ProcesoComponent } from '../modulos/param/proceso/proceso.component';
import { TipoauditoriaComponent } from '../modulos/param/tipoauditoria/tipoauditoria.component';
import { ListasDinamicasComponent } from '../modulos/param/listas-dinamicas/listas-dinamicas.component';
import { RecoverComponent } from '../email/recover/recover.component';
import { ResetComponent } from '../email/reset/reset.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'auditor', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'admin/usuarios', component: UsuariosComponent },
    { path: 'admin/roles', component: RolesComponent },
    { path: 'admin/unidades', component: UnidadesComponent },
    { path: 'param/listas',component:ListasDinamicasComponent},
    { path: 'param/criterios', component: CriterioComponent },
    { path: 'param/procesos', component: ProcesoComponent },
    { path: 'param/tipo-inspeccion', component: TipoauditoriaComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
