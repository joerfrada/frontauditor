import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { InspeccionService } from '../../../services/inspec/inspeccion.service';
import { InformeService } from 'src/app/services/informe/informe.service';
import { Permiso } from 'src/app/modelos/permiso.model';

declare var Swal:any;

export class Model {
  title: any = "";

  IsLectura: any;
}

@Component({
  selector: 'app-informe-plan-inspeccion',
  templateUrl: './informe-plan-inspeccion.component.html',
  styleUrls: ['./informe-plan-inspeccion.component.scss']
})
export class InformePlanInspeccionComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  modal: any;

  url: any;
  link: any;

  inspeccion_id: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UserService, private inspeccion: InspeccionService, private informe: InformeService, private sanitizer: DomSanitizer) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getInspecciones();

    this.url = "<iframe src=\"{0}\" width=\"100%\" height=\"500\"><iframe>";
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.nombre_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.unidad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.codigo.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }

  getPermisos() {
    let json = {
      usuario: this.currentUser.usuario,
      cod_modulo: 'RP'
    }
    this.usuario.getPermisos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.permiso.consultar = response.result.consultar;
        this.permiso.crear = response.result.crear;
        this.permiso.actualizar = response.result.actualizar;
        this.permiso.eliminar = response.result.eliminar;
      }
    })
  }

  getInspecciones() {
    this.inspeccion.getInspecciones().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  openInforme(data: any) {
    this.model.title = "Informe: " + data.nombre_inspeccion;
    this.modal = true;
    this.inspeccion_id = data.inspeccion_id;
    this.url = this.sanitizer.bypassSecurityTrustHtml(this.url.replace("{0}", this.informe.getInformePlanInspeccionPreview(data.inspeccion_id) + "#zoom=100&toolbar=0"));
    this.link = this.informe.getInformePlanInspeccion(data.inspeccion_id);
  }

  closeInformeModal(bol: any) {
    this.modal = bol;
    this.reload();
  }

}
