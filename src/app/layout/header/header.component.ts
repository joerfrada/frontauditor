import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from '../../services/auth/login.service';
import { PerfilService } from 'src/app/services/config/perfil.service';

declare var $:any;
declare var Swal:any;

export class Model {
  title = "";

  varUsuario: any = {
    id: 0,
    name: "",
    email: "",
    password: "",
    passwordVerify: ""
  }

  varRoles: any = [];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  model = new Model();

  currentUser: any;

  perfilModal: any;

  constructor(private router: Router, private api: ApiService, private login: LoginService, private perfil: PerfilService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
  }

  logout() {
    this.login.logout().subscribe(data => {});
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/']);    
    }, 100);    
  }

  toggleDropdown() {
    $('.dropdown-menu').toggleClass('dropdown-open');
  }

  openPerfil() {
    this.perfilModal = true;
    this.model.title = 'Mi Perfil - ' + this.currentUser.nombre_completo;
    this.model.varUsuario = new Model().varUsuario;

    $('.dropdown-menu').removeClass('dropdown-open');

    this.perfil.getRoles({ usuario_id: this.currentUser.usuario_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varRoles = response.result;
        this.model.varUsuario.nombre_completo = this.currentUser.nombre_completo;
      }
    })
  }

  closePerfilModal(bol: any) {
    this.perfilModal = bol;
  }

  updatePassword() {
    if (this.model.varUsuario.password != this.model.varUsuario.passwordVerify) {
      Swal.fire({
        title: 'ERROR',
        text: 'Las contraseñas no coinciden',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      }).then((result: any) => {
        this.model.varUsuario.password = "";
        this.model.varUsuario.passwordVerify = "";
      })
    }
    else {
      this.model.varUsuario.usuario_id = this.currentUser.usuario_id;
      this.model.varUsuario.email = this.currentUser.email;

      this.perfil.updateChangePassword(this.model.varUsuario).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          Swal.fire({
            title: 'Mi Perfil',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }).then((result: any) => {
            this.perfilModal = false;
          });
        }
      });
    }
  }
}
