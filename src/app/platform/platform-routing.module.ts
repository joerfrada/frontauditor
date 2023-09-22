import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComponent } from './platform.component';
// import { LoginComponent } from '../auth/login/login.component';
import { SamlComponent } from '../saml/saml.component';
import { RecoverComponent } from '../email/recover/recover.component';
import { ResetComponent } from '../email/reset/reset.component';
import { HomeComponent } from '../modulos/home/home.component';
import { UsuariosComponent } from '../modulos/admin/usuarios/usuarios.component';
import { RolesComponent } from '../modulos/admin/roles/roles.component';
import { UnidadesComponent } from '../modulos/param/unidades/unidades.component';
import { ListasDinamicasComponent } from '../modulos/param/listas-dinamicas/listas-dinamicas.component';
import { InspeccionesComponent } from '../modulos/inspec/inspecciones/inspecciones.component';
import { AnotacionesComponent } from '../modulos/inspec/anotaciones/anotaciones.component';
import { InformePlanInspeccionComponent } from '../modulos/informes/informe-plan-inspeccion/informe-plan-inspeccion.component';
import { InformeSeguimientoComponent } from '../modulos/informes/informe-seguimiento/informe-seguimiento.component';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'saml', component: SamlComponent },
  { path: '',   redirectTo: '/saml', pathMatch: 'full' },
  { path: 'recover', component: RecoverComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'auditor', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'admin/usuarios', component: UsuariosComponent },
    { path: 'admin/roles', component: RolesComponent },
    { path: 'param/unidades', component: UnidadesComponent },
    { path: 'param/listas', component: ListasDinamicasComponent },
    { path: 'inspec/inspecciones', component: InspeccionesComponent },
    { path: 'inspec/hallazgos', component: AnotacionesComponent },
    { path: 'informe/plan-inspeccion', component: InformePlanInspeccionComponent },
    { path: 'informe/seguimiento', component: InformeSeguimientoComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class PlatformRoutingModule { }
