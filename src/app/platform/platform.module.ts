import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
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


@NgModule({
  declarations: [
    PlatformComponent,
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
    SelectUserModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PlatformRoutingModule,
    LayoutModule
  ]
})
export class PlatformModule { }
