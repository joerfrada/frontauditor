import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginService } from '../../services/auth/login.service';

declare var $:any;
declare var Swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any = "";
  password: any = "";
  show = false;
  type_password: any;
  esMostrar = false;

  constructor(private router: Router, private loginService: LoginService, private api: ApiService) { }

  ngOnInit(): void {
    this.type_password = 'password';
  }

  onPassword(evento: any) {
    if (evento.target.value.length > 5) {
      this.esMostrar = true;
    }
    else this.esMostrar = false;
  }

  togglePassword() {
    if (this.type_password === 'password') {
      this.type_password = 'text';
      this.show = true;
    } else {
      this.type_password = 'password';
      this.show = false;
    }
  }

  login() {
    $('#button').addClass('button--loading');
    this.loginService.login({ email: this.email, password: this.password }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        localStorage.setItem("currentUser", JSON.stringify(response.user.result));
        setTimeout(() => {
          this.router.navigate(['/auditor/home']);
        }, 100);
      }
      else {
        Swal.fire({
          title: 'ERROR',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'error'
        }).then((result: any) => {
          if (result) {
            this.password = "";
            $('#button').removeClass('button--loading');
          }
        });
      }
    });
  }

}
