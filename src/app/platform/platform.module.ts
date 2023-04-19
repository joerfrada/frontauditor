import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../modulos/home/home.component';
import { UsuariosComponent } from '../modulos/admin/usuarios/usuarios.component';
import { RolesComponent } from '../modulos/admin/roles/roles.component';
import { CardComponent } from '../views/card/card.component';
import { ModalComponent } from '../views/modal/modal.component';
import { SelectModalComponent } from '../views/select-modal/select-modal.component';
import { SelectRolModalComponent } from '../views/select-rol-modal/select-rol-modal.component';
import { CriterioComponent } from '../modulos/param/criterio/criterio.component';
import { ProcesoComponent } from '../modulos/param/proceso/proceso.component';
import { TipoauditoriaComponent } from '../modulos/param/tipoauditoria/tipoauditoria.component';
import { ListasDinamicasComponent } from '../modulos/param/listas-dinamicas/listas-dinamicas.component';

@NgModule({
  declarations: [
    PlatformComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    RolesComponent,
    CardComponent,
    ModalComponent,
    SelectModalComponent,
    SelectRolModalComponent,
    CriterioComponent,
    ProcesoComponent,
    TipoauditoriaComponent,
    ListasDinamicasComponent    
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
