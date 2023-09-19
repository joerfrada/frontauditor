import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { AnotacionService } from '../../../services/inspec/anotacion.service';
import { InspeccionService } from '../../../services/inspec/inspeccion.service';
import { Permiso } from 'src/app/modelos/permiso.model';
import { Utilidades } from 'src/app/helper/utilidades';

declare var Swal:any;

export class Model {
  title: any = "";
  titleModal: any = "";
  titleHeaders: any = "";
  isCrear: any;
  isSaved = false;

  IsLectura: any;

  lstTipoHallazgo: any = [];

  hallazgo_id: any;
  hallazgo_causa_raiz_id: any;

  varHallazgo: any = {
    hallazgo_id: 0,
    inspeccion_id: 0,
    codigo: "",
    nombre_inspeccion: "",
    tipo_hallazgo_id: 0,
    codificacion: "",
    tema_catalogacion_id: 0,
    codigo_tema: "",
    tema_catalogacion: "",
    fecha: new Date(),
    criterio_id: "",
    proceso: "",
    proceso_id: 0,
    subproceso: "",
    descripcion_evidencia: "",
    usuario: "",
    archivo: ""
  }

  varCorreccion: any = [];
  varMejoramiento: any = [];
  varOrden: any = [];

  varHCausa: any = {
    descripcion_evidencia: "",
    codigo: "",
    nombre_inspeccion: ""
  }

  varHActividad: any = {
    hallazgo_causa_raiz_id: 0,
    hallazgo_id: 0,
    causa_raiz: "",
    usuario: ""
  }

  lstArchivo: any = [];
  lstCausa: any = [];
  lstActividad: any = [];
}

@Component({
  selector: 'app-anotaciones',
  templateUrl: './anotaciones.component.html',
  styleUrls: ['./anotaciones.component.scss']
})
export class AnotacionesComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  array: any = [];

  modal: any;

  file: any;

  tipo: any;
  codigo: any;
  consecutivo: any;

  selectModal: any;
  selectInspeccionModal: any;
  selectUserModal: any;
  selectCriterioModal: any;
  selectCodigoModal: any;
  selectUnidadModal: any;
  selectUnidadActividadModal: any;
  causaModal: any;
  actividadModal: any;

  inputform: any;
  indexform: any;

  lstInspeccion: any = [];
  lstCodigoTema: any = [];
  lstCriterios: any = [];
  lstDependenciasLDAP: any = [];
  lstFuncionariosLDAP: any = [];
  lstUnidades: any = [];

  tipo_hallazgo: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UserService, private anotacion: AnotacionService, private inspeccion: InspeccionService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getAnotaciones();
    this.getInspecciones();
    this.getTipoHallazgo();
    this.getTemaCatalogacion();
    this.getUnidadDependencias();
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
            item.codificacion_anota.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  getAnotaciones() {
    this.anotacion.getAnotaciones().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getInspecciones() {
    this.anotacion.getInspecciones().subscribe(data => {
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

  getDepedenciasLDAP() {
    this.anotacion.getDependenciasLDAP().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.IdDependencia;
          x.item1 = x.Nombre;
          x.item2 = null;
          x.item3 = null;
        });
        this.lstDependenciasLDAP = response.result;
      }
    });
  }

  getFuncionariosLDAP() {
    this.anotacion.getFuncionariosLDAP().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.usuario_id;
          x.item = x.nombre_completo;
        });
        this.lstFuncionariosLDAP = response.result;
      }
    });
  }

  getTipoHallazgo() {
    this.anotacion.getTipoAnotacion().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.lstTipoHallazgo = response.result;
      }
    });
  }

  getTemaCatalogacion() {
    this.anotacion.getTemaCatalogacion().subscribe(data => {
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

  getUnidadDependencias() {
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
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  closeSelectInspeccionModal(bol: any) {
    this.selectInspeccionModal = bol;
  }

  closeSelectUserModal(bol: any) {
    this.selectUserModal = bol;
  }

  closeSelectCriterioModal(bol: any) {
    this.selectCriterioModal = bol;
  }

  closeSelectCodigoModal(bol: any) {
    this.selectCodigoModal = bol;
  }

  closeSelectUnidadModal(bol: any) {
    this.selectUnidadModal = bol;
  }

  closeSelectUnidadActividadModal(bol: any) {
    this.selectUnidadActividadModal = bol;
  }

  openAnotacion() {
    this.modal = true;
    this.model.title = 'Crear Hallazgo';
    this.model.isCrear = true;
    this.model.IsLectura = false;
    this.model.varHallazgo = new Model().varHallazgo;
    this.model.varCorreccion = [];
    this.model.varMejoramiento = [];
    this.model.varOrden = [];

    this.getDepedenciasLDAP();

    setTimeout(() => {
      this.changeTipoHallazgo(0);
    }, 100);
  }

  closeAnotacion(bol: any) {
    this.modal = bol;
    this.reload();
  }

  getAnotacionCorreccion(id: any) {
    this.anotacion.getAnotacionCorreccion({ hallazgo_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
          x.dependencia = x.unidad + ' / ' + x.dependencia;
        });
        this.model.varCorreccion = response.result;
      }
    });
  }

  getAnotacionMejoramiento(id: any) {
    this.anotacion.getAnotacionMejoramiento({ hallazgo_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
          x.dependencia = x.unidad + ' / ' + x.dependencia;
        });
        this.model.varMejoramiento = response.result;
      }
    });
  }

  getAnotacionOrden(id: any) {
    this.anotacion.getAnotacionOrden({ hallazgo_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
          x.dependencia = x.unidad + ' / ' + x.dependencia;
        });
        this.model.varOrden = response.result;
      }
    });
  }

  getConsecutivoHallazgo(data: any) {
    this.anotacion.getConsecutivoHallazgo({ inspeccion_id: data.inspeccion_id, tipo_hallazgo_cod: data.tipo_hallazgo_cod }).subscribe(data1 => {
      let response: any = this.api.ProcesarRespuesta(data1);
      if (response.tipo == 0) {
        this.consecutivo = response.result[0].conthallazgo;
      }
    });
  }


  editAnotacion(data: any) {
    this.modal = true;
    this.model.title = 'Actualizar Hallazgo';
    this.model.isCrear = false;
    this.model.IsLectura = false;

    this.model.varHallazgo.hallazgo_id = data.hallazgo_id;
    this.model.varHallazgo.inspeccion_id = data.inspeccion_id;
    this.model.varHallazgo.codigo = data.codigo;
    this.model.varHallazgo.nombre_inspeccion = data.nombre_inspeccion;
    this.model.varHallazgo.tipo_hallazgo_id = data.tipo_hallazgo_id;
    this.model.varHallazgo.codificacion = data.codificacion;
    this.model.varHallazgo.fecha = data.fecha;
    this.model.varHallazgo.tema_catalogacion_id = data.tema_catalogacion_id;
    this.model.varHallazgo.codigo_tema = data.codigo_tema;
    this.model.varHallazgo.tema_catalogacion = data.tema_catalogacion;
    this.model.varHallazgo.criterio_id = data.criterio_id;
    this.model.varHallazgo.criterio = data.criterio;
    this.model.varHallazgo.proceso = data.proceso;
    this.model.varHallazgo.proceso_id = data.proceso_id;
    this.model.varHallazgo.subproceso = data.subproceso;
    this.model.varHallazgo.descripcion_evidencia = data.descripcion_evidencia;

    this.codigo = data.codigo;

    this.anotacion.getAnotacionArchivo({ hallazgo_id: data.hallazgo_id }).subscribe(data1 => {
      let response: any = this.api.ProcesarRespuesta(data1);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.nombre = x.archivo.substr(0, x.archivo.indexOf('.'));
          x.link = this.api.url_file + x.archivo;
        });
        this.model.lstArchivo = response.result;
      }
    });

    this.anotacion.getCriteriosInspeccion({ inspeccion_id: data.inspeccion_id }).subscribe(data1 => {
      let response: any = this.api.ProcesarRespuesta(data1);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.criterio;
          x.item2 = x.proceso;
          x.item3 = x.subproceso;
        });

        this.lstCriterios = response.result;
      }
    });

    this.getAnotacionCorreccion(data.hallazgo_id);
    this.getAnotacionMejoramiento(data.hallazgo_id);
    this.getAnotacionOrden(data.hallazgo_id);

    this.obtenerTipoHallazgo(data.tipo_hallazgo_id);
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.model.varHallazgo.archivo = event.target.files[0].name;
  }

  obtenerTipoHallazgo(id: any) {
    if (id == 0) this.tipo = '-';
    else if (id == 746) this.tipo = 'AR';
    else if (id == 747) this.tipo = 'IN';
    else if (id == 748) this.tipo = 'IR';
    else if (id == 749) this.tipo = 'EI';
    else if (id == 750) this.tipo = 'RE';
    else if (id == 751) this.tipo = 'OR';
  }

  changeTipoHallazgo(id: any, t: any = 0) {
    if (id == 0) this.tipo = '-';
    else if (id == 746) this.tipo = 'AR';
    else if (id == 747) this.tipo = 'IN';
    else if (id == 748) this.tipo = 'IR';
    else if (id == 749) this.tipo = 'EI';
    else if (id == 750) this.tipo = 'RE';
    else if (id == 751) this.tipo = 'OR';

    if (t == 0) {
      this.model.varHallazgo.codificacion = "";
    }
    else if (t == 1) {
      let data = this.model.varHallazgo;
      this.codigo = data.codigo;
      this.anotacion.getConsecutivoHallazgo({ inspeccion_id: data.inspeccion_id, tipo_hallazgo_cod: this.tipo }).subscribe(data1 => {
        let response: any = this.api.ProcesarRespuesta(data1);
        if (response.tipo == 0) {
          this.consecutivo = response.result[0].conthallazgo;
          let nextHallazgo = this.consecutivo + 1;
          this.model.varHallazgo.codificacion = this.codigo + "-" + this.tipo + Utilidades.pad(nextHallazgo.toString(), 3);
        }
      });
    }
  }

  addCorreccion() {
    this.model.varCorreccion.push({ correcion_id:0, hallazgo_id: 0, responsable_id: 0, responsable: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteCorreccion(index: any) {
    this.model.varCorreccion.splice(index, 1);
  }

  addMejoramiento() {
    this.model.varMejoramiento.push({ mejoramiento_id:0, hallazgo_id: 0, responsable_id: 0, responsable: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteMejoramiento(index: any) {
    this.model.varMejoramiento.splice(index, 1);
  }

  addOrden() {
    this.model.varOrden.push({ orden_id:0, hallazgo_id: 0, responsable_id: 0, responsable: "", NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteOrden(index: any) {
    this.model.varOrden.splice(index, 1);
  }

  saveInspeccion() {
    this.array = this.lstInspeccion;
    this.inputform = 'inspeccion';
    this.selectInspeccionModal = true;
    this.model.titleModal = 'Inspección';
    this.model.titleHeaders = 'Código,Nombre Inspección'
  }

  saveCodigoTema() {
    this.array = this.lstCodigoTema;
    this.inputform = 'codigo-tema';
    this.selectCodigoModal = true;
    this.model.titleModal = 'Código Tema';
    this.model.titleHeaders = 'Código,Tema Catalogación';
  }

  saveCriterio() {
    this.array = this.lstCriterios;
    this.inputform = 'criterio';
    this.selectCriterioModal = true;
    this.model.titleModal = 'Criterio que se incumple';
  }

  saveDependencias(index: any, i: any) {
    this.array = this.lstDependenciasLDAP;
    this.inputform = 'dependencias' + i.toString();
    this.indexform = index;
    this.selectModal = true;
    if (i == 1) this.model.titleModal = 'Responsable Corrección';
    else if (i == 2) this.model.titleModal = 'Responsable de Plan Mejoramiento';
    else if (i == 3) this.model.titleModal = 'Responsable Orden';
  }

  saveResponsable(index: any) {
    this.array = this.lstFuncionariosLDAP;
    this.inputform = 'funcionarios';
    this.indexform = index;
    this.selectUserModal = true;
    this.model.titleModal = 'Responsable';
  }

  saveUnidad(index: any, i: any) {
    this.array = this.lstUnidades;
    this.inputform = 'dependencias' + i.toString();
    this.indexform = index;
    this.selectUnidadModal = true;
    if (i == 1) this.model.titleModal = 'Responsable Corrección';
    else if (i == 2) this.model.titleModal = 'Responsable de Plan Mejoramiento';
    else if (i == 3) this.model.titleModal = 'Responsable Orden';
    else if (i == 4) this.model.titleModal = 'Responsable Actividad';
  }

  saveUnidadActividad(index: any) {
    this.array = this.lstUnidades;
    this.inputform = 'dependencias-actividad';
    this.indexform = index;
    this.selectUnidadActividadModal = true;
    this.model.titleModal = 'Responsable Actividad';
  }

  dataform(inputform: any, data: any) {
    if (inputform == 'inspeccion') {
      this.selectInspeccionModal = false;
      this.model.varHallazgo.inspeccion_id = data.inspeccion_id;
      this.model.varHallazgo.codigo = data.codigo;
      this.model.varHallazgo.nombre_inspeccion = data.nombre_inspeccion;

      this.anotacion.getCriteriosInspeccion({ inspeccion_id: data.inspeccion_id }).subscribe(data1 => {
        let response: any = this.api.ProcesarRespuesta(data1);
        if (response.tipo == 0) {
          response.result.forEach((x: any) => {
            x.item1 = x.criterio;
            x.item2 = x.proceso;
            x.item3 = x.subproceso;
          });

          this.lstCriterios = response.result;
        }
      });
    }

    if (inputform == 'dependencias1') {
      this.selectUnidadModal = false;
      this.model.varCorreccion[this.indexform].responsable_id = data.dependencia_id;
      this.model.varCorreccion[this.indexform].unidad = data.unidad;
      this.model.varCorreccion[this.indexform].dependencia = data.unidad + ' / '  + data.dependencia;
    }

    if (inputform == 'dependencias2') {
      this.selectUnidadModal = false;
      this.model.varMejoramiento[this.indexform].responsable_id = data.dependencia_id;
      this.model.varMejoramiento[this.indexform].unidad = data.unidad;
      this.model.varMejoramiento[this.indexform].dependencia = data.unidad + ' / '  + data.dependencia;
    }

    if (inputform == 'dependencias3') {
      this.selectUnidadModal = false;
      this.model.varOrden[this.indexform].responsable_id = data.dependencia_id;
      this.model.varOrden[this.indexform].unidad = data.unidad;
      this.model.varOrden[this.indexform].dependencia = data.unidad + ' / '  + data.dependencia;
    }

    if (inputform == 'dependencias-actividad') {
      this.selectUnidadActividadModal = false;
      this.model.lstActividad[this.indexform].responsable_id = data.dependencia_id;
      this.model.lstActividad[this.indexform].unidad = data.unidad;
      this.model.lstActividad[this.indexform].dependencia = data.unidad + ' / '  + data.dependencia;
    }

    if (inputform == 'funcionarios') {
      this.selectUserModal = false;
      this.model.lstActividad[this.indexform].responsable_id = data.usuario_idid;
      this.model.lstActividad[this.indexform].responsable = data.nombre_completo;
    }

    if (inputform == 'codigo-tema') {
      this.selectCodigoModal = false;
      this.model.varHallazgo.tema_catalogacion_id = data.tema_catalogacion_id;
      this.model.varHallazgo.codigo_tema = data.codigo_tema;
      this.model.varHallazgo.tema_catalogacion = data.tema_catalogacion;
    }

    if (inputform == 'criterio') {
      this.selectCriterioModal = false;
      this.model.varHallazgo.criterio_id = data.criterio_id;
      this.model.varHallazgo.criterio = data.criterio;
      this.model.varHallazgo.proceso = data.proceso;
      this.model.varHallazgo.proceso_id = data.proceso_id;
      this.model.varHallazgo.subproceso = data.subproceso;
    }
  }

  crearAnotacion() {
    this.model.varHallazgo.tipo_hallazgo_id = Number(this.model.varHallazgo.tipo_hallazgo_id);
    this.model.varHallazgo.usuario = this.currentUser.usuario;

    var formData: any = new FormData();
    formData.append('modelo', JSON.stringify(this.model.varHallazgo));
    formData.append('archivo', this.file);

    this.anotacion.createAnotacion(formData).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        let id = response.id;

        if (this.model.varCorreccion.length > 0) {
          this.model.varCorreccion.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionCorreccion(x).subscribe(data => {});
            }
          });
        }

        if (this.model.varMejoramiento.length > 0) {
          this.model.varMejoramiento.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionMejoramiento(x).subscribe(data => {});
            }
          });
        }

        if (this.model.varOrden.length > 0) {
          this.model.varOrden.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionOrden(x).subscribe(data => {});
            }
          });
        }

        Swal.fire({
          title: 'Crear Hallazgo',
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

  actualizarAnotacion() {
    this.model.varHallazgo.tipo_hallazgo_id = Number(this.model.varHallazgo.tipo_hallazgo_id);
    this.model.varHallazgo.usuario = this.currentUser.usuario;

    var formData: any = new FormData();
    formData.append('modelo', JSON.stringify(this.model.varHallazgo));
    formData.append('archivo', this.file);

    this.anotacion.updateAnotacion(formData).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      let id = this.model.varHallazgo.hallazgo_id;

      if (response.tipo == 0) {
        if (this.model.varCorreccion.length > 0) {
          this.model.varCorreccion.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionCorreccion(x).subscribe(data => {});
            }
            else {
              this.anotacion.updateAnotacionCorreccion(x).subscribe(data => {});
            }
          });
        }

        if (this.model.varMejoramiento.length > 0) {
          this.model.varMejoramiento.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionMejoramiento(x).subscribe(data => {});
            }
            else {
              this.anotacion.updateAnotacionMejoramiento(x).subscribe(data => {});
            }
          });
        }

        if (this.model.varOrden.length > 0) {
          this.model.varOrden.forEach((x: any) => {
            x.hallazgo_id = id;
            x.usuario = this.currentUser.usuario;

            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionOrden(x).subscribe(data => {});
            }
            else {
              this.anotacion.updateAnotacionOrden(x).subscribe(data => {});
            }
          });
        }

        Swal.fire({
          title: 'Actualizar Hallazgo',
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

  getAnotacionCausaRaizInd(id: any) {
    this.anotacion.getAnotacionCausaRaiz({ hallazgo_id: id }).subscribe(data => {
      let response = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length > 0) {
          this.model.isSaved = true;
          this.model.isCrear = false;
        }
        else {
          this.model.isCrear = true;
        }

        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstCausa = response.result;
      }
    });
  }

  getAnotacionActividadInd(id: any) {
    this.anotacion.getAnotacionActividad({ hallazgo_causa_raiz_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length > 0) {
          this.model.isSaved = true;
          this.model.isCrear = false;
        }
        else {
          this.model.isCrear = true;
        }

        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.lstActividad = response.result;
      }
    });
  }

  openCausa(data: any) {
    this.causaModal = true;
    this.model.IsLectura = false;

    this.model.hallazgo_id = data.hallazgo_id;

    this.model.varHCausa.descripcion_evidencia = data.descripcion_evidencia;
    this.model.varHCausa.codigo = data.codigo;
    this.model.varHCausa.nombre_inspeccion = data.nombre_inspeccion;

    this.getAnotacionCausaRaizInd(data.hallazgo_id);

    this.getFuncionariosLDAP();
  }

  closeCausa(bol: any) {
    this.causaModal = bol;
    this.reload();
  }

  openActividad(data: any) {
    this.actividadModal = true;
    this.model.IsLectura = false;

    this.model.hallazgo_causa_raiz_id = data.hallazgo_causa_raiz_id;

    this.model.varHActividad.hallazgo_causa_raiz_id = data.hallazgo_causa_raiz_id;
    this.model.varHActividad.hallazgo_id = data.hallazgo_id;
    this.model.varHActividad.causa_raiz = data.causa_raiz;
    this.model.varHActividad.usuario = this.currentUser.usuario;

    this.tipo_hallazgo = data.tipo_hallazgo;

    this.getAnotacionActividadInd(data.hallazgo_causa_raiz_id);
  }

  closeActividad(bol: any) {
    this.actividadModal = bol;
  }

  addCausa() {
    this.model.lstCausa.push({ hallazgo_causa_raiz_id: 0, hallazgo_id: 0, causa_raiz: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteCausa(index: any) {
    this.model.lstCausa.splice(index, 1);
  }

  addActividad() {
    this.model.lstActividad.push({ hallazgo_actividad_id: 0, hallazgo_causa_raiz_id: 0, descripcion: "", entregable: "", cantidad_entregable: 0, fecha_inicio: null, fecha_termino: null, responsable_id: 0, responsable: "", usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteActividad(index: any) {
    this.model.lstActividad.splice(index, 1);
  }

  crearCausa() {
    if (this.model.lstCausa.length > 0) {
      this.model.lstCausa.forEach((x: any) => {
        x.hallazgo_id = this.model.hallazgo_id;
        x.usuario = this.currentUser.usuario;
        
        if (x.NuevoRegistro == true) {
          this.anotacion.createAnotacionCausaRaiz(x).subscribe(data => {});
        }
      });

      this.getAnotacionCausaRaizInd(this.model.hallazgo_id);
    }
  }

  actualizarCausa() {
    if (this.model.lstCausa.length > 0) {
      this.model.lstCausa.forEach((x: any) => {
        x.hallazgo_id = this.model.hallazgo_id;
        x.usuario = this.currentUser.usuario;
        
        if (x.NuevoRegistro == true) {
          this.anotacion.createAnotacionCausaRaiz(x).subscribe(data => {});
        }
        else {
          this.anotacion.updateAnotacionCausaRaiz(x).subscribe(data => {});
        }
      });

      Swal.fire({
        title: 'Actualizar Causa del incumplimiento',
        text: 'Ha actualizado exitosamente',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'success'
      }).then((result: any) => {
        this.getAnotacionCausaRaizInd(this.model.hallazgo_id);
      })
    }
  }

  openActividadDescripcion(dato: any, index: any) {
    Swal.fire({
      title: 'Descripción',
      input: 'textarea',
      inputValue: dato.descripcion,
      inputPlaceholder: 'Ingresa aquí...',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
    }).then((result: any ) => {
      if (result.value) {
        this.model.lstActividad[index].descripcion = result.value
      }
    })
  }

  guardarActividad() {
    this.anotacion.updateAnotacionCausaRaiz(this.model.varHActividad).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.model.lstActividad.length > 0) {
          this.model.lstActividad.forEach((x: any) => {
            x.hallazgo_causa_raiz_id = this.model.hallazgo_causa_raiz_id;
            x.usuario = this.currentUser.usuario;
    
            if (x.NuevoRegistro == true) {
              this.anotacion.createAnotacionActividad(x).subscribe(data => {});
            }
            else {
              this.anotacion.updateAnotacionActividad(x).subscribe(data => {});
            }
          });
    
          Swal.fire({
            title: 'Actualizar Actividad',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }).then((result: any) => {
            this.getAnotacionActividadInd(this.model.hallazgo_causa_raiz_id);
          })
        }
      }
    });
  }

  eliminarAnotacionCausaRaiz(index: any, dato: any) {
    Swal.fire({
      title: 'Eliminar Causa del incumplimiento',
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
        this.anotacion.deleteAnotacionCausaRaiz({ hallazgo_causa_raiz_id: dato.hallazgo_causa_raiz_id }).subscribe(data => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstCausa.splice(index, 1);
          }
        });
      }
    });
  }

  eliminarAnotacionActividad(index: any, dato: any) {
    Swal.fire({
      title: 'Eliminar Actividad',
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
        this.anotacion.deleteAnotacionActividad({ hallazgo_actividad_id: dato.hallazgo_actividad_id }).subscribe(data => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.lstActividad.splice(index, 1);
          }
        });
      }
    });
  }

}
