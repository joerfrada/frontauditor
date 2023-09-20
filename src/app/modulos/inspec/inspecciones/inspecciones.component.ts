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
    nombre_inspeccion: "",
    codigo: "",
    unidad_id: 0,
    unidad: "",
    dependencia: "",
    aspecto: "",
    responsable_id: 0,
    responsable: "",
    cargo_resp: "",
    insp_general_id: 0,
    inspector_general: "",
    inspector_lider_id: 0,
    inspector_lider: "",
    objetivo: "",
    alcance: "",
    tipo_inspeccion_id: 0,
    tipo_inspeccion: "",
    fecha_inicio: null,
    hora_inicio: "",
    fecha_cierre: null,
    hora_termino: "",
    observaciones: "",
    usuario: ""
  }

  varPlanInspeccion: any = {
    plan_inspeccion_id: 0,
    inspeccion_id: 0,
    codigo: "",
    fecha: new Date(),
    observaciones: "",
    usuario: ""
  }

  varActividad: any = {
    actividad_plan_inspeccion_id: 0,
    plan_inspeccion_id: 0,
    criterio_id: 0,
    criterio: "",
    proceso_id: "",
    proceso: "",
    subproceso: "",
    lugar: "",
    actividad: "",
    inspeccionado_id: "",
    inspeccionado: "",
    inspector_id: "",
    inspector: "",
    fecha_inicio: new Date(),
    hora_inicio: "",
    fecha_cierre: new Date(),
    hora_final: "",
    usuario: ""
  }

  varCriterios: any = [];

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
        if (item.nombre_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
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

  searchPlan(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varplan = this.varplanTemp;
    }
    else {
      this.varplan = this.varplanTemp.filter((item: any) => {
        if (item.inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.observaciones.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchPlan(e: any) {
    if (e.target.value == "") {
      this.varplan = this.varplanTemp;
    }
  }

  searchActividad(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varactividad = this.varactividadTemp;
    }
    else {
      this.varactividad = this.varactividadTemp.filter((item: any) => {
        if (item.actividades.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.procesos.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.inspeccionado.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.inspector.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchActividad(e: any) {
    if (e.target.value == "") {
      this.varactividad = this.varactividadTemp;
    }
  }

  getPermisos() {
    let json = {
      usuario: this.currentUser.usuario,
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
    this.model.varInspeccion = new Model().varInspeccion;

    this.loadData();
  }

  closeInspeccion(bol: any) {
    this.modal = bol;

    this.reload();
  }

  loadData() {
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
          x.id = x.usuario_id;
          x.item = x.nombre_completo;
        });
        this.lstFuncionarios = response.result;
      }
    });

    this.inspeccion.getResponsables().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.responsable_id = x.usuario_id;
          x.item = x.nombre_completo;
        });
        this.lstResponsables = response.result;
      }
    });
  }

  openPlan(data: any) {
    this.model.title = "Plan de Inspección - " + data.codigo;
    this.planModal = true;

    this.model.varInspeccion.inspeccion_id = data.inspeccion_id;
    this.model.varInspeccion.codigo = data.codigo;

    this.getPlanInspeccionById(data.inspeccion_id);
  }

  closePlan(bol: any) {
    this.planModal = bol;
  }

  getPlanInspeccionById(id: any) {
    this.inspeccion.getPlanInspecciones({id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varplan = response.result;
        this.varplanTemp = response.result;
      }
    });
  }

  openFormPlan() {
    this.f_planModal = true;
    this.model.varPlanInspeccion = new Model().varPlanInspeccion;
    this.model.title = 'Crear Plan Inspección';
    this.model.isCrear = true;
    this.model.IsLectura = false;

    this.model.varPlanInspeccion.codigo = this.model.varInspeccion.codigo;

    // this.inspeccion.getInspecciones().subscribe(data => {
    //   let response: any = this.api.ProcesarRespuesta(data);
    //   if (response.tipo == 0) {
    //     response.result.forEach((x: any) => {
    //       x.item1 = x.codigo;
    //       x.item2 = x.nombre_inspeccion;
    //       x.item3 = null;
    //     });
    //     this.lstInspeccion = response.result;
    //   }
    // });
  }

  closeFormPlan(bol: any) {
    this.f_planModal = bol;
  }

  editPlanInspeccion(data: any) {
    this.f_planModal = true;
    this.model.title = 'Actualizar Plan Inspección';
    this.model.isCrear = false;
    this.model.IsLectura = false;

    this.model.varPlanInspeccion.plan_inspeccion_id = data.plan_inspeccion_id;
    this.model.varPlanInspeccion.inspeccion_id = data.inspeccion_id;
    this.model.varPlanInspeccion.codigo = data.codigo;
    this.model.varPlanInspeccion.fecha = data.fecha;
    this.model.varPlanInspeccion.observaciones = data.observaciones;
  }

  openActividad(data: any) {
    this.actividadModal = true;
    this.model.varPlanInspeccion.plan_inspeccion_id = data.plan_inspeccion_id;

    this.getActividadesPlanInspecciones(data.plan_inspeccion_id);
  }

  getActividadesPlanInspecciones(id: any) {
    this.inspeccion.getActividadesPlanInspecciones({ plan_inspeccion_id: id }).subscribe(data => {
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
    this.model.title = 'Crear Actividad Plan Inspección';
    this.model.isCrear = true;
    this.model.IsLectura = false;
    this.model.varActividad = new Model().varActividad;

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

    this.inspeccion.getFuncionarios().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.usuario_id;
          x.item = x.nombre_completo;
        });
        this.lstFuncionarios = response.result;
      }
    });
  }

  editActividadPlanInspeccion(data: any) {
    this.f_actividadModal = true;
    this.model.title = 'Actualizar Actividad Plan Inspección';
    this.model.isCrear = false;
    this.model.IsLectura = false;

    this.model.varActividad.actividad_plan_id = data.actividad_plan_id;
    this.model.varActividad.plan_inspeccion_id = data.plan_inspeccion_id;
    this.model.varActividad.proceso_id = data.proceso_id;
    this.model.varActividad.proceso = data.proceso;
    this.model.varActividad.subproceso = data.subproceso;
    this.model.varActividad.actividad = data.actividades;
    this.model.varActividad.inspeccionado_id = data.inspeccionado_id;
    this.model.varActividad.inspeccionado = data.inspeccionado;
    this.model.varActividad.inspector_id = data.inspector_id;
    this.model.varActividad.inspector = data.inspector;
    this.model.varActividad.fecha_inicio = data.fecha_inicio;
    this.model.varActividad.hora_inicio = data.hora_inicio;
    this.model.varActividad.fecha_cierre = data.fecha_cierre;
    this.model.varActividad.hora_final = data.hora_final;

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
  }

  editInspeccion(data: any) {
    this.modal = true;
    this.model.title = 'Actualizar Inspección';
    this.model.isCrear = false;
    this.model.IsLectura = false;

    this.loadData();

    this.model.varInspeccion.inspeccion_id = data.inspeccion_id;
    this.model.varInspeccion.nombre_inspeccion = data.nombre_inspeccion;
    this.model.varInspeccion.codigo = data.codigo;
    this.model.varInspeccion.fecha_inicio_inspec = data.fecha_inicio_inspec;
    this.model.varInspeccion.unidad_id = data.unidad_id;
    this.model.varInspeccion.unidad = data.unidad;
    this.model.varInspeccion.dependencia = data.dependencia;
    this.model.varInspeccion.aspecto = data.aspecto;
    this.model.varInspeccion.responsable_id = data.responsable_id;
    this.model.varInspeccion.responsable = data.responsable;
    this.model.varInspeccion.cargo_resp = data.cargo_resp;
    this.model.varInspeccion.insp_general_id = data.insp_general_id;
    this.model.varInspeccion.inspector_general = data.inspector_general;
    this.model.varInspeccion.inspector_lider_id = data.inspector_lider_id;
    this.model.varInspeccion.inspector_lider = data.inspector_lider;
    this.model.varInspeccion.objetivo = data.objetivo;
    this.model.varInspeccion.alcance = data.alcance;
    this.model.varInspeccion.tipo_inspeccion_id = data.tipo_inspeccion_id;
    this.model.varInspeccion.tipo_inspeccion = data.tipo_inspeccion;
    this.model.varInspeccion.criterio_id = data.criterio_id;
    this.model.varInspeccion.criterio = data.criterio;
    this.model.varInspeccion.fecha_inicio = data.fecha_inicio;
    this.model.varInspeccion.hora_inicio = data.hora_inicio;
    this.model.varInspeccion.fecha_cierre = data.fecha_termino;
    this.model.varInspeccion.hora_termino = data.hora_termino;
    this.model.varInspeccion.observaciones = data.observaciones;

    this.inspeccion.getInspeccionCriterios({ inspeccion_id: data.inspeccion_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.varCriterios = response.result;
      }
    });

    this.inspeccion.getInspeccionParticulares({ inspeccion_id: data.inspeccion_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstParticular = response.result;
      }
    });

    this.inspeccion.getInspeccionInspectores({ inspeccion_id: data.inspeccion_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstInspector = response.result;
      }
    });

    this.inspeccion.getInspeccionTecnicos({ inspeccion_id: data.inspeccion_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstTecnicos = response.result;
      }
    });

    this.inspeccion.getInspeccionObservadores({ inspeccion_id: data.inspeccion_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstObservador = response.result;
        console.log(this.model.lstObservador);
      }
    });
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

  addCriterio() {
    this.model.varCriterios.push({ insp_criterio_id: 0, inspeccion_id: 0, criterio_id: 0, criterio: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteCriterio(index: any) {
    this.model.varCriterios.splice(index, 1);
  }

  eliminarCriterio(data: any, index: any) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          insp_criterio_id: data.insp_criterio_id
        }
        this.inspeccion.deleteInspeccionCriterio(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varCriterios.splice(index, 1);
          }
        });
      }
    }));
  }

  addParticular() {
    this.model.lstParticular.push({ criterio_particular_id: 0, inspeccion_id: 0, criterio_id: 0, criterio: "", proceso_id: 0, procesos: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteParticular(index: any) {
    this.model.lstParticular.splice(index, 1);
  }

  eliminarParticular(data: any, index: any) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          criterio_particular_id: data.criterio_particular_id
        }
        this.inspeccion.deleteInspeccionParticular(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstParticular.splice(index, 1);
          }
        });
      }
    }));
  }

  addInspector() {
    this.model.lstInspector.push({ equipo_inspector_id: 0, inspeccion_id: 0, proceso_id: 0, procesos: "", grado_id: 0, grado: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteInspector(index: any) {
    this.model.lstInspector.splice(index, 1);
  }

  eliminarInspector(data: any, index: any) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          equipo_inspector_id: data.equipo_inspector_id
        }
        this.inspeccion.deleteInspeccionInspector(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstInspector.splice(index, 1);
          }
        });
      }
    }));
  }

  addTecnico() {
    this.model.lstTecnicos.push({ equipo_tecnico_id: 0, inspeccion_id: 0, proceso_id: 0, procesos: "", grado_id: 0, grado: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteTecnico(index: any) {
    this.model.lstTecnicos.splice(index, 1);
  }

  eliminarTecnico(data: any, index: any) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          equipo_tecnico_id: data.equipo_tecnico_id
        }
        this.inspeccion.deleteInspeccionTecnico(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstTecnicos.splice(index, 1);
          }
        });
      }
    }));
  }

  addObservador() {
    this.model.lstObservador.push({ observador_id: 0, inspeccion_id: 0, usuario_id: 0, observador: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteObservador(index: any) {
    this.model.lstObservador.splice(index, 1);
  }

  eliminarObservador(data: any, index: any) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          observador_id: data.observador_id
        }
        this.inspeccion.deleteInspeccionObservador(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstObservador.splice(index, 1);
          }
        });
      }
    }));
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

  saveCriterios(index: any) {
    this.array = this.lstCriterios;
    this.inputform = 'criterio';
    this.selectModal = true;
    this.indexform = index;
    this.model.titleModal = 'Criterios';
  }

  saveCriteriosParticular(index: any) {
    this.array = this.lstCriterios;
    this.inputform = 'criterio-particular';
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

  saveActividadCriterio() {
    this.array = this.lstCriterios;
    this.inputform = 'actividad-criterio';
    this.selectModal = true;
    this.model.titleModal = 'Criterios';
  }

  saveActividadProceso() {
    this.array = this.lstProcesos;
    this.inputform = 'actividad-proceso';
    this.selectProcesoModal = true;
  }

  saveActividadInspeccionado() {
    this.array = this.lstFuncionarios;
    this.inputform = 'actividad-inspeccionado';
    this.selectUserModal = true;
    this.model.titleUser = "Inspeccionado";
  }

  saveActividadInspector() {
    this.array = this.lstFuncionarios;
    this.inputform = 'actividad-inspector';
    this.selectUserModal = true;
    this.model.titleUser = "Inspector";
  }

  dataform(inputform: any, data: any) {
    if (inputform == 'unidad') {
      this.selectUnidadModal = false;
      this.model.varInspeccion.unidad_id = data.dependencia_id;
      this.model.varInspeccion.unidad = data.unidad;
      this.model.varInspeccion.dependencia = data.dependencia;
    }

    if (inputform == 'tipo-inspeccion') {
      this.selectModal = false;
      this.model.varInspeccion.tipo_inspeccion_id = data.id;
      this.model.varInspeccion.tipo_inspeccion = data.item1;
    }

    if (inputform == 'responsable') {
      this.selectUserModal = false;
      this.model.varInspeccion.responsable_id = data.responsable_id;
      this.model.varInspeccion.responsable = data.nombre_completo;
    }

    if (inputform == 'inspector-general') {
      this.selectUserModal = false;
      this.model.varInspeccion.insp_general_id = data.usuario_id;
      this.model.varInspeccion.inspector_general = data.nombre_completo;
    }

    if (inputform == 'inspector-lider') {
      this.selectUserModal = false;
      this.model.varInspeccion.inspector_lider_id = data.usuario_id;
      this.model.varInspeccion.inspector_lider = data.nombre_completo;
    }

    if (inputform == 'criterio') {
      this.selectModal = false;
      this.model.varCriterios[this.indexform].criterio_id = data.criterio_id;
      this.model.varCriterios[this.indexform].criterio = data.criterio;
    }

    if (inputform == 'criterio-particular') {
      this.selectModal = false;
      this.model.lstParticular[this.indexform].criterio_id = data.criterio_id;
      this.model.lstParticular[this.indexform].criterio = data.criterio;
    }

    if (inputform == 'grado-inspector') {
      this.selectUserModal = false;
      this.model.lstInspector[this.indexform].grado_id = data.usuario_id;
      this.model.lstInspector[this.indexform].grado = data.nombre_completo;
    }

    if (inputform == 'grado-tecnico') {
      this.selectUserModal = false;
      this.model.lstTecnicos[this.indexform].grado_id = data.usuario_id;
      this.model.lstTecnicos[this.indexform].grado = data.nombre_completo;
    }

    if (inputform == 'proceso-particular') {
      this.selectProcesoModal = false;
      this.model.lstParticular[this.indexform].proceso_id = data.id;
      this.model.lstParticular[this.indexform].procesos = data.proceso + ' - ' + data.subproceso;
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
      this.model.lstObservador[this.indexform].usuario_id = data.usuario_id;
      this.model.lstObservador[this.indexform].observador = data.nombre_completo;
    }

    if (inputform == 'inspeccion') {
      this.selectInspeccionModal = false;
      this.model.varPlanInspeccion.inspeccion_id = data.inspeccion_id;
      this.model.varPlanInspeccion.inspeccion = data.codigo;
    }

    if (inputform == 'actividad-criterio') {
      this.selectModal = false;
      this.model.varActividad.criterio_id = data.criterio_id;
      this.model.varActividad.criterio = data.criterio;
    }

    if (inputform == 'actividad-proceso') {
      this.selectProcesoModal = false;
      this.model.varActividad.proceso_id = data.id;
      this.model.varActividad.proceso = data.proceso;
      this.model.varActividad.subproceso = data.subproceso;
    }

    if (inputform == 'actividad-inspeccionado') {
      this.selectUserModal = false;
      this.model.varActividad.inspeccionado_id = data.usuario_id;
      this.model.varActividad.inspeccionado = data.nombre_completo;
    }

    if (inputform == 'actividad-inspector') {
      this.selectUserModal = false;
      this.model.varActividad.inspector_id = data.usuario_id
      this.model.varActividad.inspector = data.nombre_completo;
    }
  }

  crearInspeccion() {
    let error = false;
    let error_msg = "";

    this.model.varInspeccion.usuario = this.currentUser.usuario;

    if (this.model.varInspeccion.nombre_inspeccion == "") {
      error = true;
      error_msg = '* Nombre inspección<br/>';
    }
    if (this.model.varInspeccion.codigo == "") {
      error = true;
      error_msg += '* Código<br />';
    }
    if (this.model.varInspeccion.unidad == 0) {
      error = true;
      error_msg += '* UMA<br />';
    }
    if (this.model.varInspeccion.codigo == "") {
      error = true;
      error_msg += '* Aspecto a inspeccionar<br />';
    }
    if (this.model.varInspeccion.responsable_id == 0) {
      error = true;
      error_msg += '* Responsable<br />';
    }
    if (this.model.varInspeccion.cargo_resp == "") {
      error = true;
      error_msg += '* Cargo<br />';
    }
    if (this.model.varInspeccion.insp_general_id == 0) {
      error = true;
      error_msg += '* Inspector General<br />';
    }
    if (this.model.varInspeccion.inspector_lider_id == 0) {
      error = true;
      error_msg += '* Inspector Líder<br />';
    }
    if (this.model.varInspeccion.objetivo == "") {
      error = true;
      error_msg += '* Objetivo de la Inspección<br />';
    }
    if (this.model.varInspeccion.alcance == "") {
      error = true;
      error_msg += '* Alcance de la Inspección<br />';
    }
    if (this.model.varInspeccion.tipo_inspeccion_id == 0) {
      error = true;
      error_msg += '* Tipo Inspección<br />';
    }
    if (this.model.varCriterios.length == 0) {
      error = true;
      error_msg += '* En forma general<br />';
    }
    if (this.model.lstParticular.length == 0) {
      error = true;
      error_msg += '* En forma particular<br />';
    }
    if (this.model.lstInspector.length == 0) {
      error = true;
      error_msg += '* Equipos Inspector<br />';
    }
    if (this.model.varInspeccion.fecha_inicio == null) {
      error = true;
      error_msg += '* Fecha Inicio<br />';
    }
    if (this.model.varInspeccion.hora_inicio == "") {
      error = true;
      error_msg += '* Hora Inicio<br />';
    }
    if (this.model.varInspeccion.fecha_cierre == null) {
      error = true;
      error_msg += '* Fecha Cierre<br />';
    }
    if (this.model.varInspeccion.hora_termino == "") {
      error = true;
      error_msg += '* Hora Cierre<br />';
    }
    if (this.model.varInspeccion.observaciones == "") {
      error = true;
      error_msg += '* Observaciones<br />';
    }

    if (error == true) {
      Swal.fire({
        title: 'Error Inspección',
        html: '<div class="align-left"><b>Requiere llenar los campos:</b><br />' + error_msg + '</div>',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      })
    }
    else {
      this.inspeccion.createInspeccion(this.model.varInspeccion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          let id = response.id;

          if (this.model.varCriterios.length > 0) {
            this.model.varCriterios.forEach((x: any) => {
              x.inspeccion_id = id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionCriterio(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstParticular.length > 0) {
            this.model.lstParticular.forEach((x: any) => {
              x.inspeccion_id = id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionParticular(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstInspector.length > 0) {
            this.model.lstInspector.forEach((x: any) => {
              x.inspeccion_id = id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionInspector(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstTecnicos.length > 0) {
            this.model.lstTecnicos.forEach((x: any) => {
              x.inspeccion_id = id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionTecnico(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstObservador.length > 0) {
            this.model.lstObservador.forEach((x: any) => {
              x.inspeccion_id = id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionObservador(x).subscribe(data => {});
              }
            });
          }

          Swal.fire({
            title: 'Crear Inspección',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }).then((result: any) => {
            this.modal = false;
            this.reload();
          })
        }
      });
    }
  }

  actualizarInspeccion() {
    let error = false;
    let error_msg = "";

    this.model.varInspeccion.usuario = this.currentUser.usuario;
    
    if (this.model.varInspeccion.nombre_inspeccion == "") {
      error = true;
      error_msg = '* Nombre inspección<br/>';
    }
    if (this.model.varInspeccion.codigo == "") {
      error = true;
      error_msg += '* Código<br />';
    }
    if (this.model.varInspeccion.unidad == 0) {
      error = true;
      error_msg += '* UMA<br />';
    }
    if (this.model.varInspeccion.codigo == "") {
      error = true;
      error_msg += '* Aspecto a inspeccionar<br />';
    }
    if (this.model.varInspeccion.responsable_id == 0) {
      error = true;
      error_msg += '* Responsable<br />';
    }
    if (this.model.varInspeccion.cargo_resp == "") {
      error = true;
      error_msg += '* Cargo<br />';
    }
    if (this.model.varInspeccion.insp_general_id == 0) {
      error = true;
      error_msg += '* Inspector General<br />';
    }
    if (this.model.varInspeccion.inspector_lider_id == 0) {
      error = true;
      error_msg += '* Inspector Líder<br />';
    }
    if (this.model.varInspeccion.objetivo == "") {
      error = true;
      error_msg += '* Objetivo de la Inspección<br />';
    }
    if (this.model.varInspeccion.alcance == "") {
      error = true;
      error_msg += '* Alcance de la Inspección<br />';
    }
    if (this.model.varInspeccion.tipo_inspeccion_id == 0) {
      error = true;
      error_msg += '* Tipo Inspección<br />';
    }
    if (this.model.varCriterios.length == 0) {
      error = true;
      error_msg += '* En forma general<br />';
    }
    if (this.model.lstParticular.length == 0) {
      error = true;
      error_msg += '* En forma particular<br />';
    }
    if (this.model.lstInspector.length == 0) {
      error = true;
      error_msg += '* Equipos Inspector<br />';
    }
    if (this.model.varInspeccion.fecha_inicio == null) {
      error = true;
      error_msg += '* Fecha Inicio<br />';
    }
    if (this.model.varInspeccion.hora_inicio == "") {
      error = true;
      error_msg += '* Hora Inicio<br />';
    }
    if (this.model.varInspeccion.fecha_cierre == null) {
      error = true;
      error_msg += '* Fecha Cierre<br />';
    }
    if (this.model.varInspeccion.hora_termino == "") {
      error = true;
      error_msg += '* Hora Cierre<br />';
    }
    if (this.model.varInspeccion.observaciones == "") {
      error = true;
      error_msg += '* Observaciones<br />';
    }

    if (error == true) {
      Swal.fire({
        title: 'Error Inspección',
        html: '<div class="align-left"><b>Requiere llenar los campos:</b><br />' + error_msg + '</div>',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      })
    }
    else {
      this.inspeccion.updateInspeccion(this.model.varInspeccion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          if (this.model.varCriterios.length > 0) {
            this.model.varCriterios.forEach((x: any) => {
              x.inspeccion_id = this.model.varInspeccion.inspeccion_id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionCriterio(x).subscribe(data => {});
              }
              else {
                this.inspeccion.updateInspeccionCriterio(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstParticular.length > 0) {
            this.model.lstParticular.forEach((x: any) => {
              x.inspeccion_id = this.model.varInspeccion.inspeccion_id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionParticular(x).subscribe(data => {});
              }
              else {
                this.inspeccion.updateInspeccionParticular(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstInspector.length > 0) {
            this.model.lstInspector.forEach((x: any) => {
              x.inspeccion_id = this.model.varInspeccion.inspeccion_id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionInspector(x).subscribe(data => {});
              }
              else {
                this.inspeccion.updateInspeccionInspector(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstTecnicos.length > 0) {
            this.model.lstTecnicos.forEach((x: any) => {
              x.inspeccion_id = this.model.varInspeccion.inspeccion_id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionTecnico(x).subscribe(data => {});
              }
              else {
                this.inspeccion.updateInspeccionTecnico(x).subscribe(data => {});
              }
            });
          }

          if (this.model.lstObservador.length > 0) {
            this.model.lstObservador.forEach((x: any) => {
              x.inspeccion_id = this.model.varInspeccion.inspeccion_id;

              if (x.NuevoRegistro == true) {
                this.inspeccion.createInspeccionObservador(x).subscribe(data => {});
              }
              else {
                this.inspeccion.updateInspeccionObservador(x).subscribe(data => {});
              }
            });
          }

          Swal.fire({
            title: 'Actualizar Inspección',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }).then((result: any) => {
            this.modal = false;
            this.reload();
          })
        }
      })
    }
  }

  crearPlanInspeccion() {
    this.model.varPlanInspeccion.inspeccion_id = this.model.varInspeccion.inspeccion_id;
    this.model.varPlanInspeccion.usuario = this.currentUser.usuario;
    
    this.inspeccion.createPlanInspeccion(this.model.varPlanInspeccion).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Crear Plan Inspección',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.f_planModal = false;
          this.getPlanInspeccionById(this.model.varPlanInspeccion.inspeccion_id);
        })
      }
    });
  }

  actualizarPlanInspeccion() {
    this.model.varPlanInspeccion.usuario = this.currentUser.usuario;
    
    this.inspeccion.updatePlanInspeccion(this.model.varPlanInspeccion).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Actualizar Plan Inspección',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.f_planModal = false;
          this.getPlanInspeccionById(this.model.varPlanInspeccion.inspeccion_id);
        })
      }
    });
  }

  crearActividadPlanInspeccion() {
    this.model.varActividad.plan_inspeccion_id = this.model.varPlanInspeccion.plan_inspeccion_id;
    this.model.varActividad.usuario = this.currentUser.usuario;

    this.inspeccion.createActividadPlanInspeccion(this.model.varActividad).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Crear Actividad Plan Inspección',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.f_actividadModal = false;
          this.getActividadesPlanInspecciones(this.model.varPlanInspeccion.plan_inspeccion_id);
        })
      }
    });
  }

  actualizarActividadPlanInspeccion() {
    this.model.varActividad.plan_inspeccion_id = this.model.varPlanInspeccion.plan_inspeccion_id;
    this.model.varActividad.usuario = this.currentUser.usuario;

    this.inspeccion.updateActividadPlanInspeccion(this.model.varActividad).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Actualizar Actividad Plan Inspección',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.f_actividadModal = false;
          this.getActividadesPlanInspecciones(this.model.varPlanInspeccion.plan_inspeccion_id);
        })
      }
    });
  }
}
