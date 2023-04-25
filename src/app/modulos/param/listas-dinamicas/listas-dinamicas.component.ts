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

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private lista: ListasService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getListas();
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

  getListas() {
    this.lista.getListas().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varhistorial = response.result;
        this.model.varhistorialTemp = response.result;
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

    this.model.varLista.nombre_lista = data.nombre_lista;
    this.model.varLista.activo = (data.activo == 1) ? true : false;
    this.model.varLista.usuario = this.currentUser.usuario;
  }

  crearLista() {}
}
