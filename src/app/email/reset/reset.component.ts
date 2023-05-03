import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PerfilService } from '../../services/config/perfil.service';

declare var Swal: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  q: any;
  password = "";
  passwordVerify = "";
  show_loader = false;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private perfil: PerfilService) {}

  ngOnInit(): void {
    this.q = this.route.snapshot.queryParamMap.get('q');
    // console.log(window.atob(this.q));
  }

  updateReset() {
    if (this.password == "") {
      Swal.fire({
        title: 'ERROR',
        text: 'Por favor ingrese de nuevo',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      }).then((result: any) => {
        this.password = "";
        this.passwordVerify = "";
      })
    }
    else {
      if (this.password != this.passwordVerify) {
        Swal.fire({
          title: 'ERROR',
          text: 'Las contraseñas no coinciden',
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'error'
        }).then((result: any) => {
          this.password = "";
          this.passwordVerify = "";
        })
      }
      else {
        let json = {
          q: this.q,
          password: this.password
        }
        
        this.show_loader = true;        
        this.perfil.resetPassword(json).subscribe(data => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.show_loader = false;

            Swal.fire({
              title: 'Reestablaecer contraseña',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              icon: 'success'
            }).then((result: any) => {
              if (result) {
                this.router.navigate(['/']);
              }
            });
          }
        });
      }
    }
  }

}
