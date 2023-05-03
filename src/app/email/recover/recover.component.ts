import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MailService } from '../../services/email/mail.service';

declare var Swal: any;

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  email = "";
  show_loader = false;

  constructor(private router: Router, private api: ApiService, private mail: MailService) {}

  ngOnInit(): void {
  }

  enviarEmail() {
    this.show_loader = true;
    this.mail.enviarMail({ email: this.email }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Enviar Correo',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          if (result) {
            this.router.navigate(['/']);
            this.show_loader = false;
          }
        });
      }
      else {
        this.show_loader = false;
      }
    });
  }

}
