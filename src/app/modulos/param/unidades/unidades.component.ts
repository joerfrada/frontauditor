import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UnidadService } from 'src/app/services/param/unidad.service';
import { UserService } from '../../../services/admin/user.service';
import { Permiso } from 'src/app/modelos/permiso.model';

declare var Swal:any;

export class Model {
  title: any = "";
  isCrear: any;

  unidad_id = 0;

  varUnidad: any = {
    unidad_id: 0,
    nombre_unidad: "",
    denominacion: "",
    ciudad: "",
    direccion: "",
    unidad_padre_id: 0,
    activo: true,
    usuario: ""
  }

  varUnidadDependencia: any = {
    unidad_id: 0,
    unidad_padre_id: 0,
    nombre_unidad: "",
    denominacion: "",
    ciudad: "",
    direccion: "",
    activo: true,
    usuario: ""
  }

  IsLectura: any;

  lstUnidades: any = [];

  modalDependencias: any;

  varhistorialDependencia: any = [];
  varhistorialDependenciaTemp: any = [];
}

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  modal: any;
  modalDependencia: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private unidad: UnidadService, private usuario: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getUnidades();
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
        if (item.nombre_unidad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.denominacion.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.ciudad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.direccion.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  getUnidades() {
    this.unidad.getUnidades().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
        this.model.lstUnidades = response.result;
      }
    });
  }

  getUnidadesById(id: any) {
    this.unidad.getUnidadesById({ id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varhistorialDependencia = response.result;
        this.model.varhistorialDependenciaTemp = response.result;
      }
    });
  }

  openUnidadModal() {
    this.model.title = 'Crear Unidad';
    this.modal = true;
    this.model.isCrear = true;
    this.model.varUnidad = new Model().varUnidad;

    this.model.IsLectura = false;
  }

  closeUnidadModal(bol: any) {
    this.modal = bol;
    this.reload();
  }

  getPermisos() {
    let json = {
      usuario: this.currentUser.usuario,
      cod_modulo: 'AD'
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

  editUnidad(data: any) {
    this.model.title = 'Actualizar Unidad';
    this.modal = true;
    this.model.isCrear = false;

    this.model.varUnidad.unidad_id = data.unidad_id;
    this.model.varUnidad.nombre_unidad = data.nombre_unidad;
    this.model.varUnidad.denominacion = data.denominacion;
    this.model.varUnidad.ciudad = data.ciudad;
    this.model.varUnidad.direccion = data.direccion;
    this.model.varUnidad.unidad_padre_id = data.unidad_padre_id == null ? 0 : data.unidad_padre_id;
    this.model.varUnidad.activo = (data.activo == 1) ? true : false;

    this.model.IsLectura = false;
  }

  openDetalleUnidad(data: any) {
    this.model.title = 'Detalle Unidad';
    this.modal = true;
    this.model.isCrear = false;

    this.model.varUnidad.unidad_id = data.unidad_id;
    this.model.varUnidad.nombre_unidad = data.nombre_unidad;
    this.model.varUnidad.denominacion = data.denominacion;
    this.model.varUnidad.ciudad = data.ciudad;
    this.model.varUnidad.direccion = data.direccion;
    this.model.varUnidad.unidad_padre_id = data.unidad_padre_id == null ? 0 : data.unidad_padre_id;
    this.model.varUnidad.activo = (data.activo == 1) ? true : false;

    this.model.IsLectura = true;
  }

  crearUnidad() {
    // this.model.varUnidad.unidad_padre_id = Number(this.model.varUnidad.unidad_padre_id);
    this.model.varUnidad.usuario = this.currentUser.usuario;

    this.unidad.createUnidades(this.model.varUnidad).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Unidades',
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

  actualizarUnidad() {
    // this.model.varUnidad.unidad_padre_id = Number(this.model.varUnidad.unidad_padre_id);
    this.model.varUnidad.usuario = this.currentUser.usuario;

    this.unidad.updateUnidades(this.model.varUnidad).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Unidades',
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

  openDependencias(data: any) {
    this.model.modalDependencias = true;
    this.model.title = 'Dependencias - ' + data.nombre_unidad;

    this.model.unidad_id = data.unidad_id;

    this.getUnidadesById(data.unidad_id);
  }

  closeDependencias(bol: any) {
    this.model.modalDependencias = bol;
  }

  searchDetalle(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.model.varhistorialDependencia = this.model.varhistorialDependenciaTemp;
    }
    else {
      this.model.varhistorialDependencia = this.model.varhistorialDependenciaTemp.filter((item: any) => {
        if (item.nombre_unidad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.denominacion.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchDetalle(e: any) {
    if (e.target.value == "") {
      this.model.varhistorialDependencia = this.model.varhistorialDependenciaTemp;
    }
  }

  openUnidadDependenciaModal() {
    this.model.title = 'Crear Dependencia';
    this.modalDependencia = true;
    this.model.isCrear = true;
    this.model.IsLectura = false;

    this.model.varUnidadDependencia = new Model().varUnidadDependencia;
  }

  editDependencias(data: any) {
    this.model.title = 'Actualizar Dependencia - ' + data.nombre_unidad;
    this.modalDependencia = true;
    this.model.isCrear = false;
    this.model.IsLectura = false;

    this.model.varUnidadDependencia.unidad_id = data.unidad_id;
    this.model.varUnidadDependencia.nombre_unidad = data.nombre_unidad;
    this.model.varUnidadDependencia.denominacion = data.denominacion;
    this.model.varUnidadDependencia.unidad_padre_id= data.unidad_padre_id;
    this.model.varUnidadDependencia.ciudad = data.ciudad;
    this.model.varUnidadDependencia.direccion = data.direccion;
    this.model.varUnidadDependencia.activo = (data.activo == 1) ? true : false;
  }

  closeUnidadDependenciaModal(bol: any) {
    this.modalDependencia = bol;
  }

  saveUnidadDependencia() {
    this.model.varUnidadDependencia.unidad_padre_id = this.model.unidad_id;
    this.model.varUnidadDependencia.usuario = this.currentUser.usuario;

    this.unidad.createUnidades(this.model.varUnidadDependencia).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Dependencias',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.modalDependencia = false;
          this.getUnidadesById(this.model.unidad_id);
        });
      }
    });
  }

  updateUnidadDependencia() {
    this.model.varUnidadDependencia.usuario = this.currentUser.usuario;

    this.unidad.updateUnidades(this.model.varUnidadDependencia).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Dependencias',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.modalDependencia = false;
          this.getUnidadesById(this.model.unidad_id);
        });
      }
    });
  }
}
