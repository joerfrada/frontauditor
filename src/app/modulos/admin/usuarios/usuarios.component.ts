import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';

declare var Swal:any;

export class Model {
  title: any;
  isEdit: any;

  varUsuario: any = {
    usuario_id: 0,
    usuario: "",
    nombres: "",
    apellidos: "",
    num_identificacion: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };

  varRol: any = [];
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  userModal: any;
  rolModal: any;
  selectModal: any;

  user_id: any;
  usuario_menu_id: any;
  index: any;
  inputform: any;

  array: any = [];
  varprivilegio: any = [];

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.user_id = this.currentUser.user_id;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRolPrivilegios();
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
        if (item.name.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.email.toString().toLowerCase().indexOf(filtro) !== -1) {
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

  getUsers() {
    this.usuario.getUsers().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getRolPrivilegios() {
    this.usuario.getRolPrivilegiosPantalla().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varprivilegio = response.result;
      }
    });
  }

  openCrearModal() {
    this.userModal = true;
  }

  closeCrearModal(bol: any) {
    this.userModal = bol;
  }

  openRol(dato: any) {
    this.rolModal = true;
    this.model.title = "Asignar Rol - " + dato.name;

    this.user_id = dato.user_id;

    this.usuario.getUsuariosRolesById({user_id: dato.user_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.varRol = response.result;
      }
    });
  }

  closeRolModal(bol: any) {
    this.rolModal = bol;
    this.reload();
  }

  addRol() {
    this.model.varRol.push({usuario_rol_id: 0, user_id: this.currentUser.user_id, rol_id: 0, rol_privilegio_id: 0, rol: "", modulo: "", nombre_pantalla: "", menu_id: null, activo: true, usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false});
  }

  deleteRol(index: any) {
    this.model.varRol.splice(index, 1);
  }

  saveRol() {
    if (this.model.varRol.length > 0) {
      this.model.varRol.forEach((element: any) => {
        element.usuario = this.currentUser.usuario;

        if (element.NuevoRegistro == true) {
          this.usuario.createUsuariosRoles(element).subscribe(data1 => {});
        }
        else {
          this.usuario.updateUsuariosRoles(element).subscribe(data1 => {});
        }
      });
      let menus_id = this.model.varRol.map((x: any) => x.menu_id).join(",");
      let json = {
        user_id: this.currentUser.user_id,
        menu_id: menus_id == "" ? null : menus_id,
        usuario: this.currentUser.usuario
      }
      this.usuario.createAssignMenu(json).subscribe(data => {});
    }

    Swal.fire({
      title: 'Asignar Roles',
      text: 'El registro ha guardado exitoso.',
      allowOutsideClick: false,
      showConfirmButton: true,
      icon: 'success'
    }).then((result: any) => {
      this.rolModal = false;
      this.reload();
    })
  }

  saveRolPrivilegio(index: number) {
    this.array = this.varprivilegio;
    this.inputform = 'rol-privilegio';
    this.index = index;
    this.selectModal = true;
  }

  eliminarRegistro(data: any, index: any) {
    Swal.fire({
      title: 'Roles',
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
          usuario_rol_id: data.usuario_rol_id
        }
        this.usuario.deleteUsuariosRolesId(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varRol.splice(index, 1);
          }
        });
      }
    }));
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;
    if (inputform == 'rol-privilegio') {
      this.model.varRol[this.index].rol_id = data.rol_id;
      this.model.varRol[this.index].rol_privilegio_id = data.rol_privilegio_id;
      this.model.varRol[this.index].rol = data.rol;
      this.model.varRol[this.index].modulo = data.modulo;
      this.model.varRol[this.index].nombre_pantalla = data.nombre_pantalla;
      this.model.varRol[this.index].menu_id = data.menu_id;
    }
  }

}
