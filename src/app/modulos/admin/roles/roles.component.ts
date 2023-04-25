import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RolService } from 'src/app/services/admin/rol.service';
import { UserService } from '../../../services/admin/user.service';
import { Permiso } from 'src/app/modelos/permiso.model';

declare var Swal:any;

export class Model {
  title: any = "";
  isEdit: any;

  varRol: any = {
    id: 0,
    name: ""
  }

  IsLectura: any;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  varprivilegio: any = [];
  varprivilegioTemp: any = [];

  varmodulo: any = [];

  array: any = [];

  inputform: any;
  index: any;

  rol_id: any;

  rolModal: any;
  rolPrivilegioModal: any;
  selectModal: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private rol: RolService, private usuario: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getRoles();
    this.getModulos();
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
        if (item.name.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  searchPrivilegio(e: any) {
    let filtro: string = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varprivilegio = this.varprivilegioTemp;
    }
    else {
      this.varprivilegio = this.varprivilegioTemp.filter((item: any) => {
        if (item.nombre_pantalla.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchPrivilegio(e: any) {
    if (e.target.value == "") {
      this.varprivilegio = this.varprivilegioTemp;
    }
  }

  getRoles() {
    this.rol.getRoles().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.rol_id = x.id;
        })
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getModulos() {
    this.rol.getModulos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.item1 = x.modulo;
          x.item2 = x.pantalla;
        });
        this.varmodulo = response.result;
      }
    });
  }

  openCrearModal() {
    this.rolModal = true;
    this.model.title = 'Crear Rol';
    this.model.isEdit = false;
    this.model.varRol = new Model().varRol;
    this.model.IsLectura = false;
  }

  closeCrearModal(bol: any) {
    this.rolModal = bol;
  }

  editRol(data: any) {
    this.rolModal = true;
    this.model.title = 'Actualizar Rol';
    this.model.isEdit = true;

    this.model.varRol.id = data.id;
    this.model.varRol.name = data.name;
  }

  saveRol() {
    this.rol.createRol(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Roles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.rolModal = false;
          this.reload();
        });
      }
    })
  }

  updateRol() {
    this.rol.updateRol(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Roles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.rolModal = false;
          this.reload();
        });
      }
    })
  }

  openRolPrivilegiosById(id: any) {
    this.rol.getRolPrivilegiosById({ rol_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.consultar = (x.consultar == 1) ? true : false;
          x.crear = (x.crear == 1) ? true : false;
          x.actualizar = (x.actualizar == 1) ? true : false;
          x.eliminar = (x.eliminar == 1) ? true : false;
          x.activo = (x.activo == 1) ? true : false;
          x.EliminarRegistro = true;
        });
        this.varprivilegio = response.result;
        this.varprivilegioTemp = response.result;
      }
    });
  }

  openRolPrivilegios(dato: any) {
    this.rolPrivilegioModal = true;
    this.model.title = "Roles Privilegios - " + dato.name;
    this.model.IsLectura = false;

    this.rol_id = dato.rol_id;

    this.openRolPrivilegiosById(dato.rol_id);
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  openRolDetalle(data: any) {
    this.rolModal = true;
    this.model.title = 'Detalle Rol';
    this.model.IsLectura = true;

    this.model.varRol.id = data.id;
    this.model.varRol.name = data.name;
    this.model.varRol.activo = data.activo == 1 ? true : false;
  }

  openPrivilegioDetalle(data: any) {
    this.rolPrivilegioModal = true;
    this.model.title = "Roles Privilegios - " + data.name;
    this.model.IsLectura = true;

    this.openRolPrivilegiosById(data.rol_id);
  }

  saveModulo(index: number) {
    this.array = this.varmodulo;
    this.inputform = 'modulo';
    this.index = index;
    this.selectModal = true;
  }

  addPrivilegio() {
    this.varprivilegio.push({rol_privilegio_id:0,rol_id:0,num_pantalla:0,modulo:"",nombre_pantalla:"",consultar:false,crear:false,actualizar:false,eliminar:false,activo:true,usuario:this.currentUser.usuario,NuevoRegistro:true,EliminarRegistro:false});
  }

  deletePrivilegio(index: any) {
    this.varprivilegio.splice(index, 1);
  }

  closeRolPrivilegioModal(bol: any) {
    this.rolPrivilegioModal = bol;
  }

  eliminarRegistro(data: any, index: any) {
    Swal.fire({
      title: 'Roles Privilegios',
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
          rol_privilegio_id: data.rol_privilegio_id
        }
        this.rol.deleteRolPrivilegiosById(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.varprivilegio.splice(index, 1);
          }
        });
      }
    }));
  }

  savePrivilegios() {
    if (this.varprivilegio.length > 0) {
      this.varprivilegio.forEach((x: any) => {
        x.rol_id = this.rol_id;
        if (x.NuevoRegistro == true) {
          x.usuario = this.currentUser.usuario;
          this.rol.createRolPrivilegios(x).subscribe(data => {
            this.api.ProcesarRespuesta(data);
          });
        }
        else {
          x.usuario = this.currentUser.usuario;
          this.rol.updateRolPrivilegios(x).subscribe(data => {
            this.api.ProcesarRespuesta(data);
          });
        }        

        Swal.fire({
          title: 'Roles Privilegios',
          text: 'El rol privilegio fue guardado con éxito.',
          allowOutsideClick: false,
          showConfirmButton: true,
          icon: 'success'
        }).then((result: any) => {
          this.rolPrivilegioModal = false;
          this.openRolPrivilegiosById(this.rol_id);
          this.reload();
        });
      });
    }
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;
    if (inputform == 'modulo') {
      this.varprivilegio[this.index].num_pantalla = data.menu_id;
      this.varprivilegio[this.index].modulo = data.item1;
      this.varprivilegio[this.index].nombre_pantalla = data.item2;

      if (data.menu_id == null) {
        this.varprivilegio[this.index].consultar = true;
        this.varprivilegio[this.index].crear = true;
        this.varprivilegio[this.index].actualizar = true;
        this.varprivilegio[this.index].eliminar = true;
      }
    }
  }

  getPermisos() {
    let json = {
      usuario: this.currentUser.email,
      cod_modulo: 'AD'
    }
    this.usuario.getPermisos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.permiso.consultar = response.result.consultar;
        this.permiso.crear = response.result.crear;
        this.permiso.actualizar = response.result.actualizar;
        this.permiso.eliminar = response.result.eliminar;

        console.log(this.permiso);
      }
    })
  }

}
