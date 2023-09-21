import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { SeguimientoService } from '../../../services/seguim/seguimiento.service';
import { Permiso } from 'src/app/modelos/permiso.model';
import { Utilidades } from '../../../helper/utilidades';
import { Workbook } from 'exceljs';

declare var Swal:any;

export class Model {
  title: any = "";
  titleModal: any = "";
  titleHeaders: any = "";
  isCrear: any;

  IsLectura: any;

  varSeguimiento: any = {
    seguimiento_id: 0,
    inspeccion_id: 0,
    nombre_inspeccion: "",
    codigo_inspeccion: "",
    fecha_concepto: null,
    concepto_efectividad_id: 0,
    hallazgo_id: 0,
    codificacion: "",
    hallazgo_causa_raiz_id: 0,
    causa: "",
    hallazgo_actividad_id: 0,
    actividad: "",
    seguimiento: "",
    fecha_seguimiento: null,
    tema_catalogacion_id: "",
    codigo_tema: "",
    tema_catalogacion: "",
    archivo: "",
    responsable_id: 0,
    responsable: "",
    porcentaje: 0,
    usuario: ""
  }

  lstArchivo: any = [];
}

@Component({
  selector: 'app-informe-seguimiento',
  templateUrl: './informe-seguimiento.component.html',
  styleUrls: ['./informe-seguimiento.component.scss']
})
export class InformeSeguimientoComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  modal: any;
  selectInspeccionModal: any;
  selectCodigoTemaModal: any;
  selectHallazgoModal: any;
  selectCausaModal: any;
  selectActividadModal: any;
  selectUserModal: any;
  infoModal: any;

  array: any = [];
  lstInspeccion: any = [];
  lstCodigoTema: any = [];
  lstConcepto: any = [];
  lstHallazgo: any = [];
  lstHallazgoTemp: any = [];
  lstCausa: any = [];
  lstActividad: any = [];
  lstEventos: any = [];
  lstFuncionarios: any = [];

  tipoHallazgo: any;
  tipoHallazgo_codigo: any;

  cells: any = [
    "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"
  ];

  cellHeaders: any = [
    "ID",
    "Porcentaje",
    "Código Inspección",
    "Nombre Inspección",
    "Tipo Inspección",
    "Unidad",
    "Dependencia",
    "Código Hallazgo",
    "Descripción Hallazgo",
    "Tipo Hallazgo",
    "Fecha Hallazgo",
    "Criterio que se incumple",
    "Causa del Incumplimiento",
    "Actividad",
    "Entregable",
    "Cantidad Entregable",
    "Fecha Inicio",
    "Fecha Término",
    "Código Tema",
    "Tema Catalogación",
    "Fecha Seguimiento",
    "Seguimiento",
    "Días Restantes",
    "Responsable",
    "Fecha Concepto",
    "Concepto Efectividad"
  ];

  inputform: any;

  file: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UserService, private seguim: SeguimientoService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getSeguimientos();
    this.getInspecciones();
    this.getTemaCatalogacion();
    this.getConceptoEfectividad();
    this.getHallazgos();
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
        if (item.seguimiento_id.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.codigo_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.nombre_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.unidad.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  getSeguimientos() {
    this.seguim.getSeguimientos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.estado = (x.porcentaje < 100) ? 1 : 0;
        });
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    })
  }

  getInspecciones() {
    this.seguim.getInspecciones().subscribe(data => {
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

  getFuncionarios() {
    this.seguim.getFuncionarios().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.responsable_id = x.usuario_id;
          x.responsable = x.nombre_completo;
          x.item = x.nombre_completo;
        });
        this.lstFuncionarios = response.result;
      }
    });
  }

  getTemaCatalogacion() {
    this.seguim.getTemaCatalogacion().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.codigo_tema;
          x.item2 = x.tema_catalogacion;
          x.item3 = null;
        });
        this.lstCodigoTema = response.result;
      }
    });
  }

  getConceptoEfectividad() {
    this.seguim.getConceptoEfectividad().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        this.lstConcepto = response.result;
      }
    });
  }

  getHallazgos() {
    this.seguim.getAnotaciones().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.codificacion;
          x.item2 = x.tipo_hallazgo;
          x.item3 = null;
        });
        this.lstHallazgo = response.result;
        this.lstHallazgoTemp = response.result;
      }
    });
  }

  getAnotacionCausa(id: any) {
    this.seguim.getAnotacionCausaRaiz({ hallazgo_id: id }).subscribe(data => {
      let response = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.causa_raiz;
          x.item2 = null;
          x.item3 = null;
        });
        this.lstCausa = response.result;
      }
    });
  }

  getAnotacionActividad(id: any) {
    this.seguim.getAnotacionActividad({ hallazgo_causa_raiz_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.descripcion;
          x.item2 = x.entregable;
          x.item3 = x.dependencia;
        });
        this.lstActividad = response.result;
      }
    });
  }

  getEventos(id: any) {
    this.seguim.getEventos({ seguimiento_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.lstEventos = response.result;
      }
    });
  }

  addEvento() {
    this.lstEventos.push({ evento_id: 0, seguimiento_id: 0, fecha_evento: null, descripcion: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteEvento(index: any) {
    this.lstEventos.splice(index, 1);
  }

  eliminarEvento(index: any, dato: any) {
    Swal.fire({
      title: 'Eliminar Evento',
      text: '¿Estás seguro que desea eliminar el registro?',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      icon: 'question'
    }).then((result: any) => {
      if (result.dismiss != "cancel") {
        this.seguim.deleteEventos({ evento_id: dato.evento_id }).subscribe(data => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.lstEventos.splice(index, 1);
          }
        });
      }
    });
  }

  openSeguimiento() {
    this.modal = true;
    this.model.varSeguimiento = new Model().varSeguimiento;
    this.model.title = "Crear Seguimiento";
    this.model.IsLectura = false;
    this.model.isCrear = true;

    this.getFuncionarios();
  }

  closeSeguimiento(bol: any) {
    this.modal = bol;
    this.reload();
  }

  editSeguimiento(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Seguimiento";
    this.model.IsLectura = false;
    this.model.isCrear = false;

    this.model.varSeguimiento = data;

    this.getFuncionarios();

    this.seguim.getSeguimientoArchivo({ seguimiento_id: data.seguimiento_id }).subscribe(data1 => {
      let response: any = this.api.ProcesarRespuesta(data1);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.nombre = x.archivo.substr(0, x.archivo.indexOf('.'));
          x.link = this.api.url_file_seg + x.archivo;
        });
        this.model.lstArchivo = response.result;
      }
    })

    this.getEventos(data.seguimiento_id);
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.model.varSeguimiento.archivo = event.target.files[0].name;
  }

  closeSelectInspeccionModal(bol: any) {
    this.selectInspeccionModal = bol;
  }

  closeSelectCodigoTemaModal(bol: any) {
    this.selectInspeccionModal = bol;
  }

  closeSelectHallazgoModal(bol: any) {
    this.selectHallazgoModal = bol;
  }

  closeSelectCausaModal(bol: any) {
    this.selectCausaModal = bol;
  }

  closeSelectActividadModal(bol: any) {
    this.selectActividadModal = bol;
  }

  closeSelectUserModal(bol: any) {
    this.selectUserModal = bol;
  }

  closeInfoModal(bol: any) {
    this.infoModal = bol;
  }

  saveInspeccion() {
    this.array = this.lstInspeccion;
    this.inputform = 'inspeccion';
    this.selectInspeccionModal = true;
    this.model.titleModal = 'Inspección';
  }

  saveCodigoTema() {
    this.array = this.lstCodigoTema;
    this.inputform = 'codigo-tema';
    this.selectCodigoTemaModal = true;
    this.model.titleModal = 'Código Tema';
  }

  saveAnotacion() {
    this.array = this.lstHallazgo;
    this.inputform = 'hallazgo';
    this.selectHallazgoModal = true;
    this.model.titleModal = 'Hallazgos';
  }

  saveCausa() {
    this.array = this.lstCausa;
    this.inputform = 'causa';
    this.selectCausaModal = true;
    this.model.titleModal = 'Hallazgo Causa del Incumplimiento';
  }

  saveActividad() {
    this.array = this.lstActividad;
    this.inputform = 'actividad';
    this.selectActividadModal = true;
    this.model.titleModal = 'Hallazgo Actividad';
  }

  saveResponsable() {
    this.array = this.lstFuncionarios;
    this.inputform = 'responsable';
    this.selectUserModal = true;
    this.model.titleModal = 'Responsable';
  }

  dataform(inputform: any, data: any) {

    if (inputform == 'inspeccion') {
      this.selectInspeccionModal = false;
      this.model.varSeguimiento.inspeccion_id = data.inspeccion_id;
      this.model.varSeguimiento.codigo_inspeccion = data.codigo;
      this.model.varSeguimiento.nombre_inspeccion = data.nombre_inspeccion;

      this.lstHallazgo = this.lstHallazgoTemp.filter((x: any) => x.inspeccion_id == data.inspeccion_id);
      this.model.varSeguimiento.codificacion = '';
      this.model.varSeguimiento.causa = '';
      this.model.varSeguimiento.actividad = '';
    }

    if (inputform == 'hallazgo') {
      this.selectHallazgoModal = false;
      this.model.varSeguimiento.hallazgo_id = data.hallazgo_id;
      this.model.varSeguimiento.codificacion = data.codificacion;
      this.tipoHallazgo_codigo = data.tipo_hallazgo_cod;

      let dato = this.lstHallazgo.filter((x: any) => x.tipo_hallazgo_cod == data.tipo_hallazgo_cod)[0]
      this.model.varSeguimiento.tema_catalogacion_id = dato.tema_catalogacion_id;
      this.model.varSeguimiento.codigo_tema = dato.codigo_tema;
      this.model.varSeguimiento.tema_catalogacion = dato.tema_catalogacion;

      if (data.tipo_hallazgo_cod == 'AR' || data.tipo_hallazgo_cod == 'OR') {
        this.model.varSeguimiento.hallazgo_causa_raiz_id = null;
        this.model.varSeguimiento.causa = "N/A";
        this.model.varSeguimiento.hallazgo_actividad_id = null;
        this.model.varSeguimiento.actividad = "N/A";
      }
      else if (data.tipo_hallazgo_cod == 'IN' || data.tipo_hallazgo_cod == 'IR' || data.tipo_hallazgo_cod == 'EI' || data.tipo_hallazgo_cod == 'OR') {
        this.model.varSeguimiento.hallazgo_causa_raiz_id = 0
        this.model.varSeguimiento.causa = "";
        this.model.varSeguimiento.hallazgo_actividad_id = 0;
        this.model.varSeguimiento.actividad = "";
      }

      this.getAnotacionCausa(data.hallazgo_id);
    }

    if (inputform == 'causa') {
      this.selectCausaModal = false;
      this.model.varSeguimiento.hallazgo_causa_raiz_id = data.hallazgo_causa_raiz_id;
      this.model.varSeguimiento.causa = data.causa_raiz;

      this.getAnotacionActividad(data.hallazgo_causa_raiz_id);
    }

    if (inputform == 'actividad') {
      this.selectActividadModal = false;
      this.model.varSeguimiento.hallazgo_actividad_id = data.hallazgo_actividad_id;
      this.model.varSeguimiento.actividad = data.descripcion;
    }

    if (inputform == 'responsable') {
      this.selectUserModal = false;
      this.model.varSeguimiento.responsable_id = data.responsable_id;
      this.model.varSeguimiento.responsable = data.responsable;
    }
  }

  crearSeguimiento() {
    let error = false;
    let error_msg = "";

    this.model.varSeguimiento.concepto_efectividad_id = Number(this.model.varSeguimiento.concepto_efectividad_id);
    this.model.varSeguimiento.porcentaje = Number(this.model.varSeguimiento.porcentaje);
    this.model.varSeguimiento.usuario = this.currentUser.usuario;

    if (this.model.varSeguimiento.inspeccion_id == 0) {
      error = true;
      error_msg = '* Inspección<br/>';
    }
    // if (this.model.varSeguimiento.fecha_concepto == null) {
    //   error = true;
    //   error_msg += '* Fecha Concepto Efectividad<br/>';
    // }
    if (this.model.varSeguimiento.hallazgo_id == 0) {
      error = true;
      error_msg += '* Código Hallazgo<br/>';
    }
    // if (this.model.varSeguimiento.hallazgo_causa_raiz_id == 0) {
    //   error = true;
    //   error_msg += '* Causa del Incumplimiento<br/>';
    // }
    // if (this.model.varSeguimiento.hallazgo_actividad_id == 0) {
    //   error = true;
    //   error_msg += '* Actividad / Descripción<br/>';
    // }
    if (this.model.varSeguimiento.seguimiento == "") {
      error = true;
      error_msg += '* Seguimiento<br/>';
    }
    if (this.model.varSeguimiento.fecha_seguimiento == null) {
      error = true;
      error_msg += '* Fecha Seguimiento<br/>';
    }
    if (this.lstEventos.length > 0) {
      for (let i = 0; i < this.lstEventos.length; i++) {
        if (this.lstEventos[i].fecha_evento == null) {
          error = true;
          error_msg += '* Ingresa una fecha en ' + (i + 1) + 'ª fila (Eventos)<br />';
        }
        if (this.lstEventos[i].descripcion == "") {
          error = true;
          error_msg += '* Ingresa una descripción en ' + (i + 1) + 'ª fila (Eventos)<br />';
        }
      }
    }
    // if (this.model.varSeguimiento.porcentaje == 0) {
    //   error = true;
    //   error_msg += '* Avance Físico de Ejecución<br/>';
    // }

    if (error == true) {
      Swal.fire({
        title: 'Error Seguimiento',
        html: '<div class="align-left"><b>Requiere llenar los campos:</b><br />' + error_msg + '</div>',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      })
    }
    else {
      let existe = null;
      if (this.tipoHallazgo_codigo == 'AR' || this.tipoHallazgo_codigo == 'OR') {
        existe = this.varhistorialTemp.filter((x: any) => x.inspeccion_id == this.model.varSeguimiento.inspeccion_id && x.hallazgo_id == this.model.varSeguimiento.hallazgo_id);
        if (existe.length == 1) {
          Swal.fire({
            title: 'ADVERTENCIA',
            text: 'La combinación ya tiene un seguimiento',
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'warning'
          });
        }
        else {
          existe = this.varhistorialTemp.filter((x: any) => x.inspeccion_id == this.model.varSeguimiento.inspeccion_id && x.hallazgo_id == this.model.varSeguimiento.hallazgo_id && x.hallazgo_causa_raiz_id == this.model.varSeguimiento.hallazgo_causa_raiz_id && x.hallazgo_actividad_id == this.model.varSeguimiento.hallazgo_actividad_id);
          if (existe.length == 1) {
            Swal.fire({
              title: 'ADVERTENCIA',
              text: 'La combinación ya tiene un seguimiento',
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              icon: 'warning'
            });
          }
          else {
            var formData: any = new FormData();
            formData.append('modelo', JSON.stringify(this.model.varSeguimiento));
            formData.append('archivo', this.file);
    
            this.seguim.createSeguimientos(formData).subscribe(data => {
              let response: any = this.api.ProcesarRespuesta(data);
              if (response.tipo == 0) {
                if (this.lstEventos.length > 0) {
                  this.lstEventos.forEach((x: any) => {
                    x.seguimiento_id = response.id;
                    x.usuario = this.currentUser.usuario;
    
                    if (x.NuevoRegistro == true) {
                      this.seguim.createEventos(x).subscribe(data => {});
                    }
                  });
                }
    
                Swal.fire({
                  title: 'Crear Seguimiento',
                  text: response.mensaje,
                  allowOutsideClick: false,
                  showConfirmButton: true,
                  confirmButtonText: 'Aceptar',
                  icon: 'success'
                }).then((result: any) => {
                  this.modal = false;
                  this.reload();
                });
              }
            });
          }
        }
      }
      else if (this.tipoHallazgo_codigo == 'IN' || this.tipoHallazgo_codigo == 'IR' || this.tipoHallazgo_codigo == 'EI' || this.tipoHallazgo_codigo == 'RE') {
        existe = this.varhistorialTemp.filter((x: any) => x.inspeccion_id == this.model.varSeguimiento.inspeccion_id && x.hallazgo_id == this.model.varSeguimiento.hallazgo_id && x.hallazgo_causa_raiz_id == this.model.varSeguimiento.hallazgo_causa_raiz_id && x.hallazgo_actividad_id == this.model.varSeguimiento.hallazgo_actividad_id);
        if (existe.length == 1) {
          Swal.fire({
            title: 'ADVERTENCIA',
            text: 'La combinación ya tiene un seguimiento',
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'warning'
          });
        }
        else {
          var formData: any = new FormData();
          formData.append('modelo', JSON.stringify(this.model.varSeguimiento));
          formData.append('archivo', this.file);
  
          this.seguim.createSeguimientos(formData).subscribe(data => {
            let response: any = this.api.ProcesarRespuesta(data);
            if (response.tipo == 0) {
              if (this.lstEventos.length > 0) {
                this.lstEventos.forEach((x: any) => {
                  x.seguimiento_id = response.id;
                  x.usuario = this.currentUser.usuario;
  
                  if (x.NuevoRegistro == true) {
                    this.seguim.createEventos(x).subscribe(data => {});
                  }
                });
              }
  
              Swal.fire({
                title: 'Crear Seguimiento',
                text: response.mensaje,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                icon: 'success'
              }).then((result: any) => {
                this.modal = false;
                this.reload();
              });
            }
          });
        }
      }
    }
  }

  actualizarSeguimiento() {
    let error = false;
    let error_msg = "";

    this.model.varSeguimiento.concepto_efectividad_id = Number(this.model.varSeguimiento.concepto_efectividad_id);
    this.model.varSeguimiento.porcentaje = Number(this.model.varSeguimiento.porcentaje);
    this.model.varSeguimiento.usuario = this.currentUser.usuario;

    if (this.model.varSeguimiento.inspeccion_id == 0) {
      error = true;
      error_msg = '* Inspección<br/>';
    }
    if (this.model.varSeguimiento.hallazgo_id == 0) {
      error = true;
      error_msg += '* Código Hallazgo<br/>';
    }
    // if (this.model.varSeguimiento.hallazgo_causa_raiz_id == 0) {
    //   error = true;
    //   error_msg += '* Causa del Incumplimiento<br/>';
    // }
    // if (this.model.varSeguimiento.hallazgo_actividad_id == 0) {
    //   error = true;
    //   error_msg += '* Actividad / Descripción<br/>';
    // }
    if (this.model.varSeguimiento.seguimiento == "") {
      error = true;
      error_msg += '* Seguimiento<br/>';
    }
    if (this.model.varSeguimiento.fecha_seguimiento == null) {
      error = true;
      error_msg += '* Fecha Seguimiento<br/>';
    }
    if (this.lstEventos.length > 0) {
      for (let i = 0; i < this.lstEventos.length; i++) {
        if (this.lstEventos[i].fecha_evento == null) {
          error = true;
          error_msg += '* Ingresa una fecha en ' + (i + 1) + 'ª fila (Eventos)<br />';
        }
        if (this.lstEventos[i].descripcion == "") {
          error = true;
          error_msg += '* Ingresa una descripción en ' + (i + 1) + 'ª fila (Eventos)<br />';
        }
      }
    }
    // if (this.model.varSeguimiento.porcentaje == 0) {
    //   error = true;
    //   error_msg += '* Avance Físico de Ejecución<br/>';
    // }

    if (error == true) {
      Swal.fire({
        title: 'Error Seguimiento',
        html: '<div class="align-left"><b>Requiere llenar los campos:</b><br />' + error_msg + '</div>',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      })
    }
    else {
      var formData: any = new FormData();
      formData.append('modelo', JSON.stringify(this.model.varSeguimiento));
      formData.append('archivo', this.file);

      this.seguim.updateSeguimientos(formData).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          if (this.lstEventos.length > 0) {
            this.lstEventos.forEach((x: any) => {
              x.seguimiento_id = this.model.varSeguimiento.seguimiento_id;
              x.usuario = this.currentUser.usuario;

              if (x.NuevoRegistro == true) {
                this.seguim.createEventos(x).subscribe(data1 => {});
              }
              else {
                this.seguim.updateEventos(x).subscribe(data1 => {});
              }
            });
          }
          Swal.fire({
            title: 'Actualizar Seguimiento',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }).then((result: any) => {
            this.modal = false;
            this.reload();
          });
        }
      });
    }
  }

  infoSeguimiento(data: any) {
    this.infoModal = true;
    this.model.varSeguimiento = data;
  }

  exportarExcel() {
    var fs = require('file-saver');

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Hoja1');

    worksheet.addRow(this.cellHeaders);

    this.cells.forEach((h: any) => {
      worksheet.getCell(h).alignment = { vertical: 'middle', horizontal: 'center' };
    });

    this.seguim.exportSeguimientos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        let result = response.result;
        let datos: any = [];

        result.forEach((row: any) => {
          datos.push(Object.values(row));
        });

        datos.forEach((d: any) => {
          worksheet.addRow(d);
        });

        let i = 1;

        this.cellHeaders.forEach((h: any) => {
          worksheet.getColumn(i).width = h.length * 2;
          i++;
        });

        let uuid = Utilidades.getUniqueId(4);

        workbook.xlsx.writeBuffer().then((data1) => {
          let blob = new Blob([data1], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          fs.saveAs(blob, 'sgm-' + uuid + '.xlsx');
        });
      }
    });
  }

  validarPorcentaje(event: any): any {
    if (event.target.value > 100) {
      let length = event.target.value.length;
      event.target.value = event.target.value.slice(0, length - 1);
      this.model.varSeguimiento.porcentaje = event.target.value;
      return false;
    }
  }

}
