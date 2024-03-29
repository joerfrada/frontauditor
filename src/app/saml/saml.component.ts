import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-saml',
  templateUrl: './saml.component.html',
  styleUrls: ['./saml.component.scss']
})
export class SamlComponent implements OnInit {

  show_loader = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private api: ApiService) { }

  ngOnInit(): void {
    let id: any = this.route.snapshot.queryParamMap.get('id');
    if (id == null) {
      this.login();
    }
    else {
      this.show_loader = true;
      this.loginService.login({ id: id }).subscribe((data: any) => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          localStorage.setItem("currentUser", JSON.stringify(response.user.result));
          setTimeout(() => {
            location.href = "/auditor/home";
          }, 1000);
        }
      });
    }
  }

  private login() {
    window.location.href = "https://auditorigefa.fac.mil.co/apiauditor/saml";
  }

}
