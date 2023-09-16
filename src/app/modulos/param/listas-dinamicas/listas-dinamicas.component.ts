import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from './entidades';
import { ListasService } from 'src/app/services/param/listas.service';
import { ApiService } from 'src/app/services/api.service';

declare var Swal:any;

@Component({
  selector: 'app-listas-dinamicas',
  templateUrl: './listas-dinamicas.component.html',
  styleUrls: ['./listas-dinamicas.component.scss']
})
export class ListasDinamicasComponent implements OnInit {
  model = new Model();
  detalle_id: any;
  selectModal: any;

  array: any = [];
  inputform: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private lista: ListasService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getListas();
    this.getListaDetalleFull();
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
      this.model.varhistorial = this.model.varhistorialTemp;
    }
    else {
      this.model.varhistorial = this.model.varhistorialTemp.filter((item: any) => {
        if (item.nombre_lista.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.model.varhistorial = this.model.varhistorialTemp;
    }
  }

  searchDetalle(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.model.varhistorialDetalle = this.model.varhistorialDetalleTemp;
    }
    else {
      this.model.varhistorialDetalle = this.model.varhistorialDetalleTemp.filter((item: any) => {
        if (item.lista_dinamica.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.lista_padre.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchDetalle(e: any) {
    if (e.target.value == "") {
      this.model.varhistorialDetalle = this.model.varhistorialDetalleTemp;
    }
  }

  getListas() {
    this.lista.getListas().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varhistorial = response.result;
        this.model.varhistorialTemp = response.result;
      }
    });
  }

  getListaDetalleFull() {
    this.lista.getListaDetalleFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.nombre_lista;
          x.item2 = x.lista_dinamica;
          x.item3 = x.lista_padre;
        });
        this.model.lstListaDetalleFull = response.result;
      }
    });
  }

  getListasDinamicasById(id: any) {
    this.lista.ObtenerListasDetalles({ nombre_lista_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.lista_padre_id = (x.lista_padre_id == null) ? 0 : x.lista_padre_id;
        });
        this.model.varhistorialDetalle = response.result;
        this.model.varhistorialDetalleTemp = response.result;
      }
    });
  }

  openCrearLista() {
    this.model.title = 'Crear Lista Dinamica';
    this.model.modal = true;
    this.model.isCrear = true;
    this.model.varLista = new Model().varLista;
  }

  closeListaModal(bol: any) {
    this.model.modal = bol;
    this.reload();
  }

  editLista(data: any) {
    this.model.title = 'Actualizar Lista Dinamica';
    this.model.modal = true;
    this.model.isCrear = false;

    this.model.varLista.nombre_lista_id = data.nombre_lista_id;
    this.model.varLista.nombre_lista = data.nombre_lista;
    this.model.varLista.activo = (data.activo == 1) ? true : false;
    this.model.varLista.usuario = this.currentUser.usuario;
  }

  openListaDetalle(data: any) {
    this.model.title = 'Lista Valores - ' + data.nombre_lista;
    this.model.detalleModal = true;

    this.detalle_id = data.nombre_lista_id;

    this.getListasDinamicasById(data.nombre_lista_id);
  }  

  closeListaDetalleModal(bol: any) {
    this.model.detalleModal = bol;
    this.reload();
  }

  openCrearListaDetalle() {
    this.model.titleValor = 'Crear Lista Valores';
    this.model.ldetalleModal = true;
    this.model.isCrear = true;
    this.model.varListaDetalle = new Model().varListaDetalle;
  }

  editListaDetalle(data: any) {
    this.model.titleValor = 'Actualizar Lista Valores - ' + data.lista_dinamica;
    this.model.ldetalleModal = true;
    this.model.isCrear = false;

    this.model.varListaDetalle.lista_dinamica_id = data.lista_dinamica_id;
    this.model.varListaDetalle.nombre_lista_id = data.nombre_lista_id;
    this.model.varListaDetalle.lista_dinamica = data.lista_dinamica;
    this.model.varListaDetalle.codigo = data.codigo;
    this.model.varListaDetalle.lista_padre_id = data.lista_padre_id == null ? 0 : data.lista_padre_id;
    this.model.varListaDetalle.nombre_valor = data.lista_padre;
    this.model.varListaDetalle.activo = (data.activo == 1) ? true : false;
  }

  closeListaDDetalleModal(bol: any) {
    this.model.ldetalleModal = bol;
  }

  crearLista() {
    this.model.varLista.nombre_lista = this.model.varLista.nombre_lista.toUpperCase();
    this.model.varLista.usuario = this.currentUser.usuario;

    this.lista.crearLista(this.model.varLista).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Crear Listas',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          icon: 'success'
        }).then((result: any) => {
          this.model.modal = false;
          this.reload();
        })
      }
    });
  }

  actualizarLista() {
    this.model.varLista.nombre_lista = this.model.varLista.nombre_lista.toUpperCase();
    this.model.varLista.usuario = this.currentUser.usuario;

    this.lista.actualizarLista(this.model.varLista).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Actualizar Listas',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          icon: 'success'
        }).then((result: any) => {
          this.model.modal = false;
          this.reload();
        })
      }
    });
  }

  crearListaDetalle() {
    this.model.varListaDetalle.nombre_lista_id = this.detalle_id;
    this.model.varListaDetalle.lista_padre_id = Number(this.model.varListaDetalle.lista_padre_id);
    this.model.varListaDetalle.usuario = this.currentUser.usuario;

    this.lista.crearListaDetalle(this.model.varListaDetalle).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Crear Listas Valores',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          icon: 'success'
        }).then((result: any) => {
          this.model.ldetalleModal = false;
          this.getListasDinamicasById(this.detalle_id);
        })
      }
    });
  }

  actualizarListaDetalle() {
    this.model.varListaDetalle.lista_padre_id = Number(this.model.varListaDetalle.lista_padre_id);
    this.model.varListaDetalle.usuario = this.currentUser.usuario;

    this.lista.actualizarListaDetalle(this.model.varListaDetalle).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Actualizar Listas Valores',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          icon: 'success'
        }).then((result: any) => {
          this.model.ldetalleModal = false;
          this.getListasDinamicasById(this.detalle_id);
        })
      }
    });
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveListaValor() {
    this.array = this.model.lstListaDetalleFull;
    this.inputform = 'lista-valor';
    this.selectModal = true;
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;

    if (inputform == 'lista-valor') {
      this.model.varListaDetalle.lista_padre_id = data.lista_dinamica_id;
      this.model.varListaDetalle.nombre_valor = data.lista_dinamica;
    }
  }
}
