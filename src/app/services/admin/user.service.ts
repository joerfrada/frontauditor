import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetPersonas = this.api.getBaseUrl + "admin/personas";
  private apiGetPersonasActivos = this.api.getBaseUrl + "admin/personasActivos";
  private apiGetUsers = this.api.getBaseUrl + "admin/usuarios";
  private apiGetTipoDocumentos = this.api.getBaseUrl + "admin/tipodocumentos";
  private apiGetAreas = this.api.getBaseUrl + "admin/areas";
  private apiGetCarerrasPro = this.api.getBaseUrl + "admin/carreraspro";
  private apiGetCargos = this.api.getBaseUrl + "admin/cargos";
  private apiGetCuerpos = this.api.getBaseUrl + "admin/cuerpos";
  private apiGetEmpresas = this.api.getBaseUrl + "admin/empresas";
  private apiGetEscuadrones = this.api.getBaseUrl + "admin/escuadrones";
  private apiGetEspecalidadCert = this.api.getBaseUrl + "admin/especialidadcert";
  private apiGetEspecialidades = this.api.getBaseUrl + "admin/especialidades";
  private apiGetFuerzas = this.api.getBaseUrl + "admin/fuerzas";
  private apiGetGrados = this.api.getBaseUrl + "admin/grados";
  private apiGetGrupos = this.api.getBaseUrl + "admin/grupos";
  private apiGetNivelComp = this.api.getBaseUrl + "admin/nivelcomp";
  private apiGetProcesos = this.api.getBaseUrl + "admin/procesos";
  private apiGetTalleres = this.api.getBaseUrl + "admin/talleres";
  private apiGetUnidades = this.api.getBaseUrl + "admin/unidades";
  private apiCreatePersonal = this.api.getBaseUrl + "admin/usuario/crearPersonal";
  private apiUpdatePersonal = this.api.getBaseUrl + "admin/usuario/actualizarPersonal";
  private apiCreateUsuario = this.api.getBaseUrl + "admin/usuario/crearUsuario";
  private apiUpdateUsuario = this.api.getBaseUrl + "admin/usuario/actualizarUsuario";
  private apiGetUsuariosRolesById = this.api.getBaseUrl + "admin/usuario/getUsuariosRolesById";
  private apiCreateUsuarioRol = this.api.getBaseUrl + "admin/usuario/crearUsuarioRol";
  private apiUpdateUsuarioRol = this.api.getBaseUrl + "admin/usuario/actualizarUsuarioRol";
  private apiGetRolPrivilegiosPantalla = this.api.getBaseUrl + "admin/usuario/getRolPrivilegiosPantalla";
  private apiDeleteUsuariosRolesId = this.api.getBaseUrl + "admin/usuario/eliminarUsuariosRolesId";
  private apiAssignMenu = this.api.getBaseUrl + "admin/usuario/asignarMenu";
  private apiGetPermisos = this.api.getBaseUrl + "admin/usuario/permisos";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getPersonas(): Observable<any> {
    return this.http.get<any>(this.apiGetPersonas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getPersonasActivos(): Observable<any> {
    return this.http.get<any>(this.apiGetPersonasActivos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiGetUsers, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getTipoDocumentos(): Observable<any> {
    return this.http.get<any>(this.apiGetTipoDocumentos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getAreas(): Observable<any> {
    return this.http.get<any>(this.apiGetAreas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCarrerasPro(): Observable<any> {
    return this.http.get<any>(this.apiGetCarerrasPro, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCargos(): Observable<any> {
    return this.http.get<any>(this.apiGetCargos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCuerpos(): Observable<any> {
    return this.http.get<any>(this.apiGetCuerpos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getEmpresas(): Observable<any> {
    return this.http.get<any>(this.apiGetEmpresas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getEscuadrones(): Observable<any> {
    return this.http.get<any>(this.apiGetEscuadrones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getEspecialidadCert(): Observable<any> {
    return this.http.get<any>(this.apiGetEspecalidadCert, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getEspecialidades(): Observable<any> {
    return this.http.get<any>(this.apiGetEspecialidades, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getFuerzas(): Observable<any> {
    return this.http.get<any>(this.apiGetFuerzas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getGrados(): Observable<any> {
    return this.http.get<any>(this.apiGetGrados, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getGrupos(): Observable<any> {
    return this.http.get<any>(this.apiGetGrupos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getNivelComp(): Observable<any> {
    return this.http.get<any>(this.apiGetNivelComp, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getProcesos(): Observable<any> {
    return this.http.get<any>(this.apiGetProcesos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getTalleres(): Observable<any> {
    return this.http.get<any>(this.apiGetTalleres, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUnidades(): Observable<any> {
    return this.http.get<any>(this.apiGetUnidades, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createPersonal(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreatePersonal, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updatePersonal(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdatePersonal, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateUsuario, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateUsuario, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUsuariosRolesById(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUsuariosRolesById, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUsuariosRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateUsuarioRol, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUsuariosRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateUsuarioRol, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getRolPrivilegiosPantalla(): Observable<any> {
    return this.http.get<any>(this.apiGetRolPrivilegiosPantalla, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteUsuariosRolesId(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteUsuariosRolesId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createAssignMenu(data: any): Observable<any> {
    return this.http.post<any>(this.apiAssignMenu, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getPermisos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPermisos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
