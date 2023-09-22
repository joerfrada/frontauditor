import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/admin/user.service';
import { ImageService } from 'src/app/services/image/image.service';
import { Permiso } from 'src/app/modelos/permiso.model';
import { PerfilService } from 'src/app/services/config/perfil.service';
import { ListasService } from 'src/app/services/param/listas.service';

declare var $:any;
declare var Swal:any;

export class Model {
  title: any;
  isEdit: any;
  filename = '../../assets/img/profile.png';
  foto: string | ArrayBuffer | null | undefined;

  varUsuario: any = {
    usuario_id: 0,
    personal_id: 0,
    nombre_completo: "",
    email: "",
    activo: true,
    password: "",
    passwordMatch: "",
    usuario: ""
  }

  varPersona: any = {
    personal_id: 0,
    nombres: '',
    apellidos: '',
    tipo_documento_id: 0,
    num_identificacion: '',    
    email: '',    
    empresa_id: null,
    activo: true,
    usuario_id: "",
    usuario: "",
  }

  varRol: any = [];

  IsLectura: any;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {

  // @ViewChild('myCanvas', {static: false})
  // canvas?: ElementRef<HTMLCanvasElement>;

  // ctx?: CanvasRenderingContext2D;

  model = new Model();
  permiso = new Permiso();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  userModal: any;
  rolModal: any;
  selectModal: any;
  personalModal: any;
  empresaModal: any;

  usuario_id: any;
  usuario_menu_id: any;
  index: any;
  inputform: any;

  array: any = [];
  varprivilegio: any = [];

  lstTipoDoc: any = [];
  lstAreas: any = [];
  lstCarrerasPro: any = [];
  lstCargos: any = [];
  lstCuerpos: any = [];
  lstEmpresas: any = [];
  lstEscuadrones: any = [];
  lstEspecialidadCert: any = [];
  lstEspecialidades: any = [];
  lstFuerzas: any = [];
  lstGrados: any = [];
  lstGrupos: any = [];
  lstNivelComp: any = [];
  lstProcesos: any = [];
  lstTalleres: any = [];
  lstUnidades: any = [];
  lstPersonas: any = [];

  lstTipoPersonal: any = [
    {
      id: 9,
      valor: "Civil" 
    },
    {
      id: 10,
      valor: "Militar"
    }
  ];

  grado: any = "";

  currentUser: any;

  context: any

  file: any;

  isDisabled = false;

  constructor(private router: Router, private api: ApiService, private usuario: UserService, private perfil: PerfilService, private lista: ListasService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.usuario_id = this.currentUser.usuario_id;
  }

  ngAfterViewInit(): void {
    // let context = this.canvas?.nativeElement.getContext('2d');
    // if (context) {
    //   this.ctx = context;

    //   this.loadImage(this.ctx, this.model.filename);
    // }

    this.getPermisos();

    setTimeout(() => {
      this.getPersonas();
    }, 500);
    setTimeout(() => {
      this.getRolPrivilegios();
    }, 500);
    setTimeout(() => {
      this.getTipoIdentificacion();
    }, 500);
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
        if (item.nombres.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.apellidos.toString().toLowerCase().indexOf(filtro) !== -1 ||
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

  loadImage(ctx: any, filename: any) {
    var img = new Image;
    img.src = filename;
    img.onload = () => {
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
  }

  getPersonas() {
    this.usuario.getPersonas().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getPersonasActivos() {
    this.usuario.getPersonasActivos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstPersonas = response.result;
      }
    });
  }

  getUsuarios() {
    this.usuario.getUsuarios().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.email = x.email.toLowerCase();
        });
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getTipoIdentificacion() {
    this.usuario.getTipoDocumentos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstTipoDoc = response.result;
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
    this.model.title = 'Crear usuario';
    this.userModal = true;
    this.model.varPersona = new Model().varPersona;
    this.model.varUsuario = new Model().varUsuario;
    this.model.isEdit = false;
    this.model.IsLectura = false;
  }

  closeCrearModal(bol: any) {
    this.userModal = bol;
    this.reload();
  }

  editPersonal(data: any) {
    this.model.title = 'Actualizar usuario - ' + data.nombres + ' ' + data.apellidos;
    this.userModal = true;
    this.model.isEdit = true;
    this.model.IsLectura = false;

    this.model.varPersona.personal_id = data.personal_id;
    this.model.varPersona.nombres = data.nombres;
    this.model.varPersona.apellidos = data.apellidos;
    this.model.varPersona.tipo_documento_id = data.tipo_documento_id == null ? 0 : data.tipo_documento_id;
    this.model.varPersona.num_identificacion = data.num_identificacion;    
    this.model.varPersona.email = data.email;    
    this.model.varPersona.activo = data.activo == 1 ? true : false;
    this.model.varPersona.idempresa = data.empresa_id == null ? 0 : data.empresa_id;
    this.model.varPersona.usuario_id = data.usuario_id;
    this.model.varPersona.usuario = this.currentUser.usuario;
    this.model.varUsuario.usuario_id = data.usuario_id;
    this.model.varUsuario.personal_id = data.personal_id;

    // if (data.existe_img == 1) {
    //   let foto = this.api.url_image + data.Foto;
    //   this.loadImage(this.ctx, foto);
    // }
    // else {
    //   this.loadImage(this.ctx, this.model.filename);
    // }
  }

  openDetalle(data: any) {
    this.model.title = 'Personal Detalle - ' + data.Nombres + ' ' + data.Apellidos;
    this.userModal = true;
    this.isDisabled = true;
    this.model.isEdit = true;
    this.model.IsLectura = true;

    this.model.varPersona.idpersonal = data.IdPersonal;
    this.model.varPersona.nombres = data.Nombres;
    this.model.varPersona.apellidos = data.Apellidos;
    this.model.varPersona.idtipodoc = data.IdTipoDoc == null ? 0 : data.IdTipoDoc;
    this.model.varPersona.cedula = data.Cedula;
    this.model.varPersona.lugarexpedicion = data.Lugarexpedicion;
    this.model.varPersona.lugarnacim = data.LugarNacim;
    this.model.varPersona.foto = data.Foto;
    this.model.varPersona.fechanacim = data.FechaNacim;
    this.model.varPersona.edad = data.Edad;
    this.model.varPersona.email = data.Email;
    this.model.varPersona.emailpersonal = data.EmailPersonal;
    this.model.varPersona.categoria = data.Categoria == null ? 0 : data.Categoria;
    this.model.varPersona.idproceso = data.IdProceso == null ? 0 : data.IdProceso;
    this.model.varPersona.active = data.Active;
    this.model.varPersona.idempresa = data.IdEmresa == null ? 0 : data.IdEmpresa;
    this.model.varPersona.dependeciafacultad = data.DependeciaFacultad;
    this.model.varPersona.idcarreraprofesion = data.IdCarreraProfesion == null ? 0 : data.IdCarreraProfesion;
    this.model.varPersona.escolaridad = data.Escolaridad;
    this.model.varPersona.idcargo = data.IdCargo == null ? 0 : data.IdCargo;
    this.model.varPersona.idnivelcompetencia = data.IdNivelCompetencia == null ? 0 : data.IdNivelCompetencia;
    this.model.varPersona.experiencia = data.Experiencia;
    this.model.varPersona.fechaingreso = data.Fechaingreso;
    this.model.varPersona.idareaexperiencia = data.IdAreaExperiencia == null ? 0 : data.IdAreaExperiencia;
    this.model.varPersona.idsupervisor = data.IdSupervisor == null ? 0 : data.IdSupervisor;
    this.model.varPersona.celular = data.Celular;
    this.model.varPersona.fijo = data.Fijo;
    this.model.varPersona.oficina = data.Oficina;
    this.model.varPersona.paisresidencia = data.PaisResidencia;
    this.model.varPersona.fechatermino = data.FechaTermino;
    this.model.varPersona.estadocivil = data.EstadoCivil == null ? 0 : data.EstadoCivil;
    this.model.varPersona.direccionresi = data.DireccionResi;
    this.model.varPersona.barrio = data.Barrio;
    this.model.varPersona.idgrado = data.IdGrado == null ? 0 : data.IdGrado;
    this.model.varPersona.codigomilitar = data.CodMilitar;
    this.model.varPersona.nfolio = data.NoFolioVida;
    this.model.varPersona.idfuerza = data.IdFuerza == null ? 0 : data.IdFuerza;
    this.model.varPersona.idcuerpo = data.IdCuerpo == null ? 0 : data.IdCuerpo;
    this.model.varPersona.idespecialidad1 = data.IdEspecialidad1 == null ? 0 : data.IdEspecialidad1;
    this.model.varPersona.idespecialidad2 = data.IdEspecialidad2 == null ? 0 : data.IdEspecialidad2;
    this.model.varPersona.fechaincorpacion = data.FechaIncorporacion == null ? new Date() : data.FechaIncorporacion;
    this.model.varPersona.fechaasense = data.FechaAsense == null ? new Date() : data.FechaAsense;
    this.model.varPersona.idunidad = data.IdUnidad == null ? 0 : data.IdUnidad;
    this.model.varPersona.idgrupo = data.IdGrupo == null ? 0 : data.IdGrupo;
    this.model.varPersona.idtaller = data.IdTaller == null ? 0 : data.IdTaller;
    this.model.varPersona.idespecialidadcertificacion = data.IdEspecialidadCertificacion == null ? 0 : data.IdEspecialidadCertificacion;
    this.model.varPersona.idescuadron = data.IdEscuadron == null ? 0 : data.IdEscuadron;
    this.model.varPersona.idcarreraprofesionmil = this.model.varPersona.idcarreraprofesion;
    this.model.varPersona.idcargomil = this.model.varPersona.idcargo;
    this.model.varPersona.idespecialidadcertificacionmil = this.model.varPersona.idespecialidadcertificacion;
    this.model.varPersona.idnivelcompetenciamil = this.model.varPersona.idnivelcompetencia;

    // if (data.existe_img == 1) {
    //   let foto = this.api.url_image + data.Foto;
    //   this.loadImage(this.ctx, foto);
    // }
    // else {
    //   this.loadImage(this.ctx, this.model.filename);
    // }
  }

  openRol(dato: any) {
    this.rolModal = true;
    this.model.title = "Asignar Rol";
    this.model.IsLectura = false;

    this.usuario_id = dato.usuario_id;

    this.usuario.getUsuariosRolesById({usuario_id: dato.usuario_id}).subscribe(data => {
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

  openRolDetalle(dato: any) {
    this.rolModal = true;
    this.model.title = "Rol Detalle";
    this.model.IsLectura = true;

    this.usuario.getUsuariosRolesById({usuario_id: dato.usuario_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = false;
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
    this.model.varRol.push({usuario_rol_id: 0, usuario_id: 0, rol_id: 0, rol_privilegio_id: 0, rol: "", modulo: "", nombre_pantalla: "", menu_id: null, activo: true, usuario: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false});
  }

  deleteRol(index: any) {
    this.model.varRol.splice(index, 1);
  }

  saveRol() {
    if (this.model.varRol.length > 0) {
      this.model.varRol.forEach((element: any) => {
        element.usuario = this.currentUser.usuario;
        element.usuario_id = this.usuario_id;

        if (element.NuevoRegistro == true) {
          this.usuario.createUsuariosRoles(element).subscribe(data1 => {});
        }
        else {
          this.usuario.updateUsuariosRoles(element).subscribe(data1 => {});
        }
      });
      let menus_id = this.model.varRol.map((x: any) => x.menu_id).join(",");
      let json = {
        usuario_id: this.usuario_id,
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

  calcularEdad(fecha: any) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }
  
  changeFechaNacim(event: any) {
    if (event.target.value != null) {
      var edad = this.calcularEdad(event.target.value);
      this.model.varPersona.edad = edad;
    }
  }

  changeGrado(idgrado: any) {
    this.grado = this.lstGrados.filter((x: any) => x.IdGrado == Number(idgrado))[0].Abreviatura;
  }

  // changeFileImage(event: any) {
  //   this.file = event.target.files[0];

  //   this.model.filename = this.file.name;
  //   this.model.varPersona.tipo_imagen = this.file.name.substr(this.file.name.indexOf('.'));

  //   this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.file);
  //   reader.onload = e => {
  //       this.model.foto = e.target?.result;
  //       this.loadImage(this.ctx, e.target?.result);
  //   };
  // }

  savePersonal() {
    let existePersonal = this.varhistorialTemp.filter((x: any) => x.num_identificacion == this.model.varPersona.num_identificacion);
    if (existePersonal.length == 1) {
      Swal.fire({
        title: 'ERROR',
        text: 'Ya existe una persona en la base de datos con el mismo tipo de documento y número de documento.',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        icon: 'error'
      }).then((result: any) => {
        this.model.varUsuario.password = "";
        this.model.varUsuario.passwordMatch = "";
      })
    }
    else {
      if (this.model.varUsuario.password != this.model.varUsuario.passwordMatch) {
        Swal.fire({
          title: 'ERROR',
          text: 'Las contraseñas no coinciden. Por favor ingrese de nuevo.',
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'error'
        }).then((result: any) => {
          this.model.varUsuario.password = "";
          this.model.varUsuario.passwordMatch = "";
        })
      }
      else {
        // if (this.file) this.model.varPersona.foto = this.model.foto?.toString().substring(this.model.foto?.toString().indexOf(',') + 1);
        // else this.model.varPersona.foto = null;

        this.model.varPersona.tipo_documento_id = this.model.varPersona.tipo_documento_id == '0' ? null : Number(this.model.varPersona.tipo_documento_id);
        this.model.varPersona.usuario = this.currentUser.usuario;

        this.model.varUsuario.nombre_completo = this.model.varPersona.nombres + ' ' + this.model.varPersona.apellidos;
        this.model.varUsuario.email = this.model.varPersona.email;
        this.model.varUsuario.usuario = this.currentUser.usuario;

        this.usuario.createPersonal(this.model.varPersona).subscribe(data => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varUsuario.personal_id = response.id;
            this.usuario.createUsuario(this.model.varUsuario).subscribe(data1 => {});

            Swal.fire({
              title: 'Crear Personal',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              icon: 'success'
            }).then((result: any) => {
              this.userModal = false;
              this.reload();
            })
          }
        });
      }
    }
  }

  updatePersonal() {
    // if (this.file) this.model.varPersona.foto = this.model.foto?.toString().substring(this.model.foto?.toString().indexOf(',') + 1);
    // else this.model.varPersona.foto = null;

    this.model.varPersona.tipo_documento_id = this.model.varPersona.tipo_documento_id == '0' ? null : Number(this.model.varPersona.tipo_documento_id);
    this.model.varPersona.usuario = this.currentUser.usuario;

    this.model.varUsuario.nombre_completo = this.model.varPersona.nombres + ' ' + this.model.varPersona.apellidos;
    this.model.varUsuario.email = this.model.varPersona.email;
    this.model.varUsuario.usuario = this.currentUser.usuario;

    if (this.model.varUsuario.password != "") {
      if (this.model.varUsuario.password != this.model.varUsuario.passwordMatch) {
        Swal.fire({
          title: 'ERROR',
          text: 'Las contraseñas no coinciden',
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'error'
        }).then((result: any) => {
          this.model.varUsuario.password = "";
          this.model.varUsuario.passwordMatch = "";
        })
      }
      else {
        this.perfil.updateChangePassword(this.model.varUsuario).subscribe(data => {});
      }
    }

    this.usuario.updatePersonal(this.model.varPersona).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        Swal.fire({
          title: 'Actualizar Personal',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          icon: 'success'
        }).then((result: any) => {
          this.userModal = false;
          this.reload();
        })
      }
    });
  }

  dataform(inputform: any, data: any) {
    if (inputform == 'rol-privilegio') {
      this.selectModal = false;

      this.model.varRol[this.index].rol_id = data.rol_id;
      this.model.varRol[this.index].rol_privilegio_id = data.rol_privilegio_id;
      this.model.varRol[this.index].rol = data.rol;
      this.model.varRol[this.index].modulo = data.modulo;
      this.model.varRol[this.index].nombre_pantalla = data.nombre_pantalla;
      this.model.varRol[this.index].menu_id = data.menu_id;
    }
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

}
