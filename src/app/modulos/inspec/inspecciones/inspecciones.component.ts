import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { InspeccionService } from '../../../services/inspec/inspeccion.service';
import { Permiso } from 'src/app/modelos/permiso.model';

declare var Swal:any;

export class Model {
  title: any = "";
  isCrear: any;

  IsLectura: any;
}

@Component({
  selector: 'app-inspecciones',
  templateUrl: './inspecciones.component.html',
  styleUrls: ['./inspecciones.component.scss']
})
export class InspeccionesComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  varplan: any = [];
  varplanTemp: any = [];
  varactividad: any = [];
  varactividadTemp: any = [];

  modal: any;
  planModal: any;
  f_planModal: any;
  actividadModal: any;
  f_actividadModal: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UserService, private inspeccion: InspeccionService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getInspecciones();
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
        if (item.nombre_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1) {
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
      usuario: this.currentUser.email,
      cod_modulo: 'IN'
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

  openInspeccion() {
    this.modal = true;
    this.model.title = 'Crear Inspección';
    this.model.isCrear = true;
    this.model.IsLectura = false;
  }

  closeInspeccion(bol: any) {
    this.modal = bol;

    this.reload();
  }

  openPlan(data: any) {
    this.model.title = "Plan de Inspección - " + data.codigo;
    this.planModal = true;

    this.inspeccion.getPlanInspecciones({id: data.IdAuditoria}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varplan = response.result;
        this.varplanTemp = response.result;
      }
    });
  }

  closePlan(bol: any) {
    this.planModal = bol;
  }

  openFormPlan() {
    this.f_planModal = true;
    this.model.title = 'Crear Plan Inspección';
    this.model.isCrear = true;
    this.model.IsLectura = false;
  }

  closeFormPlan(bol: any) {
    this.f_planModal = bol;
  }

  openActividad(data: any) {
    this.actividadModal = true;

    this.inspeccion.getActividadesPlanInspecciones({ plan_inspeccion_id: data.idplaninspeccion }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varactividad = response.result;
        this.varactividadTemp = response.result;
      }
    });
  }

  closeActividad(bol: any) {
    this.actividadModal = bol;
  }

  openFormActividad() {
    this.f_actividadModal = true;
    this.model.title = 'Crear Nueva Actividad';
    this.model.isCrear = true;
    this.model.IsLectura = false;
  }

  closeFormActividad(bol: any) {
    this.f_actividadModal = bol;
  }
}
