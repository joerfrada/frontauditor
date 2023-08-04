import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { NotnegativeDirective } from '../directives/notnegative.directive';
import { RestrictDirective } from '../directives/restrict.directive';
import { LayoutModule } from '../layout/layout.module';
import { CardComponent } from '../views/card/card.component';
import { ModalComponent } from '../views/modal/modal.component';
import { SelectModalComponent } from '../views/select-modal/select-modal.component';
import { SelectRolModalComponent } from '../views/select-rol-modal/select-rol-modal.component';
import { LoginComponent } from '../auth/login/login.component';
import { RecoverComponent } from '../email/recover/recover.component';
import { ResetComponent } from '../email/reset/reset.component';
import { HomeComponent } from '../modulos/home/home.component';
import { UsuariosComponent } from '../modulos/admin/usuarios/usuarios.component';
import { RolesComponent } from '../modulos/admin/roles/roles.component';
import { ListasDinamicasComponent } from '../modulos/param/listas-dinamicas/listas-dinamicas.component';
import { UnidadesComponent } from '../modulos/param/unidades/unidades.component';
import { InspeccionesComponent } from '../modulos/inspec/inspecciones/inspecciones.component';
import { AnotacionesComponent } from '../modulos/inspec/anotaciones/anotaciones.component';
import { TimePickerComponent } from '../views/time-picker/time-picker.component';
import { SelectUserModalComponent } from '../views/select-user-modal/select-user-modal.component';
import { InformePlanInspeccionComponent } from '../modulos/informes/informe-plan-inspeccion/informe-plan-inspeccion.component';
import { SelectCodigoModalComponent } from '../views/select-codigo-modal/select-codigo-modal.component';
import { SelectUnidadModalComponent } from '../views/select-unidad-modal/select-unidad-modal.component';
import { InformeSeguimientoComponent } from '../modulos/informes/informe-seguimiento/informe-seguimiento.component';


@NgModule({
  declarations: [
    PlatformComponent,
    NotnegativeDirective,
    RestrictDirective,
    CardComponent,
    ModalComponent,
    SelectModalComponent,
    SelectRolModalComponent,
    ListasDinamicasComponent,
    LoginComponent,
    RecoverComponent,
    ResetComponent,
    HomeComponent,
    UsuariosComponent,
    RolesComponent,
    UnidadesComponent,
    InspeccionesComponent,
    AnotacionesComponent,
    TimePickerComponent,
    SelectUserModalComponent,
    InformePlanInspeccionComponent,
    SelectCodigoModalComponent,
    SelectUnidadModalComponent,
    InformeSeguimientoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PlatformRoutingModule,
    LayoutModule
  ]
})
export class PlatformModule { }
