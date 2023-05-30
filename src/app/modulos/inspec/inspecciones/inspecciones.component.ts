import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { InspeccionService } from '../../../services/inspec/inspeccion.service';
import { Permiso } from 'src/app/modelos/permiso.model';

declare var Swal:any;

export class Model {
  title: any = "";
  titleModal: any = "";
  titleUser: any = "";
  isCrear: any;

  IsLectura: any;

  varInspeccion: any = {
    inspeccion_id: 0,
    unidad_id: "",
    unidad: "",
    dependencia: "",
    tipo_inspeccion_id: 0,
    tipo_inspeccion: "",
    responsable_id: 0,
    responsable: "",
    cargo: "",
    insp_general_id: 0,
    inspector_general: "",
    insp_lider_id: 0,
    inspector_lider: "",
    criterio_id: 0,
    criterio: "",
    grado_id: 0,
    grado: ""
  }

  varPlanInspeccion: any = {
    plan_inspeccion_id: 0,
    inspeccion_id: 0,
    inspeccion: "",
    observaciones: ""
  }

  lstParticular: any = [];
  lstInspector: any = [];
  lstTecnicos: any = [];
  lstObservador: any = [];
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

  array: any = [];

  varplan: any = [];
  varplanTemp: any = [];
  varactividad: any = [];
  varactividadTemp: any = [];
  lstTipoInspeccion: any = [];
  lstCriterios: any = [];
  lstFuncionarios: any = [];
  lstResponsables: any = [];
  lstUnidades: any = [];
  lstProcesos: any = [];
  lstInspeccion: any = [];

  modal: any;
  planModal: any;
  f_planModal: any;
  actividadModal: any;
  f_actividadModal: any;
  selectModal: any;
  selectUnidadModal: any;
  selectUserModal: any;
  selectProcesoModal: any;
  selectInspeccionModal: any;

  inputform: any;
  indexform: any;

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

    this.inspeccion.getUnidadDependencias().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.unidad;
          x.item2 = x.dependencia;
        });
        this.lstUnidades = response.result;
      }
    });

    this.inspeccion.getTipoInspeccion().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.tipo_inspeccion;
          x.item2 = null;
          x.item3 = null;
        });
        this.lstTipoInspeccion = response.result;
      }
    });

    this.inspeccion.getProcesosSubProcesos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x:any) => {
          x.item1 = x.proceso;
          x.item2 = x.subproceso;
          x.item3 = null;
        });
        this.lstProcesos = response.result;
      }
    });

    this.inspeccion.getCriterios().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.criterio_id = x.lista_dinamica_id;
          x.criterio = x.lista_dinamica;
          x.item1 = x.lista_dinamica;
          x.item2 = null;
          x.item3 = null;
        });
        this.lstCriterios = response.result;
      }
    });

    this.inspeccion.getFuncionarios().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.IdUserLDAP;
          x.item = x.Name;
        });
        this.lstFuncionarios = response.result;
      }
    });

    this.inspeccion.getResponsables().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.responsable_id = x.IdUserLDAP;
          x.item = x.Name;
        });
        this.lstResponsables = response.result;
      }
    });
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
    this.model.varPlanInspeccion = new Model().varPlanInspeccion;
    this.model.title = 'Crear Plan Inspección';
    this.model.isCrear = true;
    this.model.IsLectura = false;

    this.inspeccion.getInspecciones().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.codigo;
          x.item2 = x.nombre_inspeccion;
          x.item3 = null;
        });
        this.lstInspeccion = response.result;
      }
    });
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

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  closeSelectUnidadModal(bol: any) {
    this.selectUnidadModal = bol;
  }

  closeSelectUserModal(bol: any) {
    this.selectUserModal = bol;
  }

  closeSelectProcesoModal(bol: any) {
    this.selectProcesoModal = bol;
  }

  closeSelectInspeccionModal(bol: any) {
    this.selectInspeccionModal = bol;
  }

  addParticular() {
    this.model.lstParticular.push({ criterio_id: 0, criterio: "", proceso_id: 0, procesos: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteParticular(index: any) {
    this.model.lstParticular.splice(index, 1);
  }

  addInspector() {
    this.model.lstInspector.push({ proceso_id: 0, procesos: "", grado_id: 0, grado: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteInspector(index: any) {
    this.model.lstInspector.splice(index, 1);
  }

  addTecnico() {
    this.model.lstTecnicos.push({ proceso_id: 0, procesos: "", grado_id: 0, grado: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteTecnico(index: any) {
    this.model.lstTecnicos.splice(index, 1);
  }

  addObservador() {
    this.model.lstObservador.push({ observador_id: 0, observador: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteObservador(index: any) {
    this.model.lstObservador.splice(index, 1);
  }

  saveUnidad() {
    this.array = this.lstUnidades;
    this.inputform = 'unidad';
    this.selectUnidadModal = true;
  }

  saveTipoInspeccion() {
    this.array = this.lstTipoInspeccion;
    this.inputform = 'tipo-inspeccion';
    this.selectModal = true;
    this.model.titleModal = 'Tipo Inspección';
  }

  saveResponsable() {
    this.array = this.lstResponsables;
    this.inputform = 'responsable';
    this.selectUserModal = true;
    this.model.titleUser = 'Responsable';
  }

  saveInspectorGeneral() {
    this.array = this.lstFuncionarios;
    this.inputform = 'inspector-general';
    this.selectUserModal = true;
    this.model.titleUser = "Inspector General";
  }

  saveInspectorLider() {
    this.array = this.lstFuncionarios;
    this.inputform = 'inspector-lider';
    this.selectUserModal = true;
    this.model.titleUser = "Inspector Líder";
  }

  saveGradoInspector(index: any) {
    this.array = this.lstFuncionarios;
    this.inputform = 'grado-inspector';
    this.selectUserModal = true;
    this.indexform = index;
    this.model.titleUser = "Grado";
  }

  saveGradoTecnicos(index: any) {
    this.array = this.lstFuncionarios;
    this.inputform = 'grado-tecnico';
    this.selectUserModal = true;
    this.indexform = index;
    this.model.titleUser = "Grado";
  }

  saveCriteriosGeneral() {
    this.array = this.lstCriterios;
    this.inputform = 'criterio-general';
    this.selectModal = true;
    this.model.titleModal = 'Criterios';
  }

  saveCriterios(index: any) {
    this.array = this.lstCriterios;
    this.inputform = 'criterio';
    this.selectModal = true;
    this.indexform = index;
    this.model.titleModal = 'Criterios';
  }
  
  saveProcesosParticular(index: any) {
    this.array = this.lstProcesos;
    this.inputform = 'proceso-particular';
    this.selectProcesoModal = true;
    this.indexform = index;
  }

  saveProcesosInspector(index: any) {
    this.array = this.lstProcesos;
    this.inputform = 'proceso-inspector';
    this.selectProcesoModal = true;
    this.indexform = index;
  }

  saveProcesosTecnico(index: any) {
    this.array = this.lstProcesos;
    this.inputform = 'proceso-tecnico';
    this.selectProcesoModal = true;
    this.indexform = index;
  }

  saveObservador(index: any) {
    this.array = this.lstFuncionarios;
    this.inputform = 'observador';
    this.selectUserModal = true;
    this.indexform = index;
    this.model.titleUser = "Observador";
  }

  saveInspeccion() {
    this.array = this.lstInspeccion;
    this.inputform = 'inspeccion';
    this.selectInspeccionModal = true;
    this.model.titleModal = "Código Auditoría";
  }

  dataform(inputform: any, data: any) {
    if (inputform == 'unidad') {
      this.selectUnidadModal = false;
      this.model.varInspeccion.unidad_id = data.id;
      this.model.varInspeccion.unidad = data.unidad;
      this.model.varInspeccion.dependencia = data.dependencia;
    }

    if (inputform == 'tipo-inspeccion') {
      this.selectModal = false;
      this.model.varInspeccion.tipo_inspeccion_id = data.id;
      this.model.varInspeccion.tipo_inspeccion = data.item1;
    }

    if (inputform == 'criterio-general') {
      this.selectModal = false;
      this.model.varInspeccion.criterio_id = data.criterio_id;
      this.model.varInspeccion.criterio = data.criterio;
    }

    if (inputform == 'criterio') {
      this.selectModal = false;
      this.model.lstParticular[this.indexform].criterio_id = data.criterio_id;
      this.model.lstParticular[this.indexform].criterio = data.criterio;
    }

    if (inputform == 'responsable') {
      this.selectUserModal = false;
      this.model.varInspeccion.responsable_id = data.responsable_id;
      this.model.varInspeccion.responsable = data.Name;
    }

    if (inputform == 'inspector-general') {
      this.selectUserModal = false;
      this.model.varInspeccion.insp_general_id = data.id;
      this.model.varInspeccion.inspector_general = data.Name;
    }

    if (inputform == 'inspector-lider') {
      this.selectUserModal = false;
      this.model.varInspeccion.insp_lider_id = data.id;
      this.model.varInspeccion.inspector_lider = data.Name;
    }

    if (inputform == 'grado-inspector') {
      this.selectUserModal = false;
      this.model.lstInspector[this.indexform].grado_id = data.id;
      this.model.lstInspector[this.indexform].grado = data.Name;
    }

    if (inputform == 'grado-tecnico') {
      this.selectUserModal = false;
      this.model.lstTecnicos[this.indexform].grado_id = data.id;
      this.model.lstTecnicos[this.indexform].grado = data.Name;
    }

    if (inputform == 'proceso-particular') {
      this.selectProcesoModal = false;
      this.model.lstParticular[this.indexform].proceso_id = data.id;
      this.model.lstParticular[this.indexform].proceso = data.proceso + ' - ' + data.subproceso;
    }

    if (inputform == 'proceso-inspector') {
      this.selectProcesoModal = false;
      this.model.lstInspector[this.indexform].proceso_id = data.id;
      this.model.lstInspector[this.indexform].procesos = data.proceso + ' - ' + data.subproceso;
    }

    if (inputform == 'proceso-tecnico') {
      this.selectProcesoModal = false;
      this.model.lstTecnicos[this.indexform].proceso_id = data.id;
      this.model.lstTecnicos[this.indexform].procesos = data.proceso + ' - ' + data.subproceso;
    }

    if (inputform == 'observador') {
      this.selectUserModal = false;
      this.model.lstObservador[this.indexform].observador_id = data.id;
      this.model.lstObservador[this.indexform].observador = data.Name;
    }

    if (inputform == 'inspeccion') {
      this.selectInspeccionModal = false;
      this.model.varPlanInspeccion.inspeccion_id = data.inspeccion_id;
      this.model.varPlanInspeccion.inspeccion = data.codigo;
    }
  }
}
