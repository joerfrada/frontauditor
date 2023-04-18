import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetUsers = this.api.getBaseUrl + "admin/usuarios";
  private apiGetUsuariosRolesById = this.api.getBaseUrl + "admin/usuario/getUsuariosRolesById";
  private apiCreateUsuarioRol = this.api.getBaseUrl + "admin/usuario/crearUsuarioRol";
  private apiUpdateUsuarioRol = this.api.getBaseUrl + "admin/usuario/actualizarUsuarioRol";
  private apiGetRolPrivilegiosPantalla = this.api.getBaseUrl + "admin/usuario/getRolPrivilegiosPantalla";
  private apiDeleteUsuariosRolesId = this.api.getBaseUrl + "admin/usuario/eliminarUsuariosRolesId";
  private apiAssignMenu = this.api.getBaseUrl + "admin/usuario/asignarMenu";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.apiGetUsers, this.api.getHttpOptions('g'))
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
}
