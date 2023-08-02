import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { SeguimientoService } from '../../../services/seguim/seguimiento.service';
import { Permiso } from 'src/app/modelos/permiso.model';
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
    responsable_id: "",
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
  infoModal: any;

  array: any = [];
  lstInspeccion: any = [];
  lstCodigoTema: any = [];
  lstConcepto: any = [];
  lstHallazgo: any = [];
  lstCausa: any = [];
  lstActividad: any = [];

  inputform: any;

  file: any;

  currentUser: any;

  export_link: any;

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

    this.export_link = this.api.url_export + "seguimiento";
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
        if (item.codigo_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.nombre_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.tipo_inspeccion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.unidad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.dependencia.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.codificacion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.hallazgo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.codigo_tema.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.tema_catalogacion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.criterio_hallazgo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.causa.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.actividad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.seguimiento.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.concepto_efectividad.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  openSeguimiento() {
    this.modal = true;
    this.model.varSeguimiento = new Model().varSeguimiento;
    this.model.title = "Crear Seguimiento";
    this.model.IsLectura = false;
    this.model.isCrear = true;
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

  dataform(inputform: any, data: any) {

    if (inputform == 'inspeccion') {
      this.selectInspeccionModal = false;
      this.model.varSeguimiento.inspeccion_id = data.inspeccion_id;
      this.model.varSeguimiento.codigo_inspeccion = data.codigo;
      this.model.varSeguimiento.nombre_inspeccion = data.nombre_inspeccion;
      this.model.varSeguimiento.responsable_id = data.inspector_lider_id == 0 ? 0 : data.inspector_lider_id;
      this.model.varSeguimiento.responsable = data.inspector_lider_id == 0 ? "N/A" : data.inspector_lider;

      let dato = this.lstHallazgo.filter((x: any) => x.inspeccion_id == data.inspeccion_id)[0];
      if (dato != undefined) {
        setTimeout(() => {
          this.model.varSeguimiento.hallazgo_id = dato.hallazgo_id;
          this.model.varSeguimiento.codificacion = dato.codificacion;
          this.model.varSeguimiento.tema_catalogacion_id = dato.tema_catalogacion_id;
          this.model.varSeguimiento.codigo_tema = dato.codigo_tema;
          this.model.varSeguimiento.tema_catalogacion = dato.tema_catalogacion;

          this.getAnotacionCausa(dato.hallazgo_id);
        }, 10);
      }
      else {
        this.model.varSeguimiento.tema_catalogacion_id = null;
        this.model.varSeguimiento.codigo_tema = "N/A";
        this.model.varSeguimiento.tema_catalogacion = "N/A";
      }
    }

    if (inputform == 'codigo-tema') {
      this.selectCodigoTemaModal = false;
      this.model.varSeguimiento.tema_catalogacion_id = data.tema_catalogacion_id;
      this.model.varSeguimiento.codigo_tema = data.codigo_tema;
      this.model.varSeguimiento.tema_catalogacion = data.tema_catalogacion;
    }

    if (inputform == 'hallazgo') {
      this.selectHallazgoModal = false;
      this.model.varSeguimiento.hallazgo_id = data.hallazgo_id;
      this.model.varSeguimiento.codificacion = data.codificacion;

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
  }

  crearSeguimiento() {
    let error = false;
    let error_msg = "";

    this.model.varSeguimiento.concepto_efectividad_id = Number(this.model.varSeguimiento.concepto_efectividad_id);
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
    if (this.model.varSeguimiento.hallazgo_causa_raiz_id == 0) {
      error = true;
      error_msg += '* Causa del Incumplimiento<br/>';
    }
    if (this.model.varSeguimiento.hallazgo_actividad_id == 0) {
      error = true;
      error_msg += '* Actividad / Descripción<br/>';
    }
    if (this.model.varSeguimiento.seguimiento == "") {
      error = true;
      error_msg += '* Seguimiento<br/>';
    }
    if (this.model.varSeguimiento.fecha_seguimiento == "") {
      error = true;
      error_msg += '* Fecha Seguimiento<br/>';
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

      this.seguim.createSeguimientos(formData).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
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

  actualizarSeguimiento() {
    let error = false;
    let error_msg = "";

    this.model.varSeguimiento.concepto_efectividad_id = Number(this.model.varSeguimiento.concepto_efectividad_id);
    this.model.varSeguimiento.usuario = this.currentUser.usuario;

    if (this.model.varSeguimiento.inspeccion_id == 0) {
      error = true;
      error_msg = '* Inspección<br/>';
    }
    if (this.model.varSeguimiento.fecha_concepto == null) {
      error = true;
      error_msg += '* Fecha Concepto Efectividad<br/>';
    }
    if (this.model.varSeguimiento.hallazgo_id == 0) {
      error = true;
      error_msg += '* Código Hallazgo<br/>';
    }
    if (this.model.varSeguimiento.hallazgo_causa_raiz_id == 0) {
      error = true;
      error_msg += '* Causa del Incumplimiento<br/>';
    }
    if (this.model.varSeguimiento.hallazgo_actividad_id == 0) {
      error = true;
      error_msg += '* Actividad / Descripción<br/>';
    }
    if (this.model.varSeguimiento.seguimiento == "") {
      error = true;
      error_msg += '* Seguimiento<br/>';
    }
    if (this.model.varSeguimiento.fecha_seguimiento == "") {
      error = true;
      error_msg += '* Fecha Seguimiento<br/>';
    }
    if (this.model.varSeguimiento.porcentaje == 0) {
      error = true;
      error_msg += '* Avance Físico de Ejecución<br/>';
    }

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
  }

}
