import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService {

  private apiGetInspecciones = this.api.getBaseUrl + "inspec/inspecciones";
  private apiGetUnidadDependencias = this.api.getBaseUrl + "inspec/inspeccion/getUnidadDependencias";
  private apiGetPlanInspecciones = this.api.getBaseUrl + "inspec/inspeccion/getPlanInspecciones";
  private apiGetActividadesPlanInspecciones = this.api.getBaseUrl + "inspec/inspeccion/getActividadesPlanInspeccion";
  private apiGetProcesosSubProcesos = this.api.getBaseUrl + "inspec/inspeccion/getProcesosSubprocesos";
  private apiGetCriterios = this.api.getBaseUrl + "inspec/inspeccion/getCriterios";
  private apiGetFuncionarios = this.api.getBaseUrl + "inspec/inspeccion/getFuncionarios";
  private apiGetResponsables = this.api.getBaseUrl + "inspec/inspeccion/getResponsables"
  private apiGetTipoInspeccion = this.api.getBaseUrl + "inspec/inspeccion/getTipoInspeccion"
  private apiCreateInspeccion = this.api.getBaseUrl + "inspec/inspeccion/crearInspeccion";
  private apiUpdateInspeccion = this.api.getBaseUrl + "inspec/inspeccion/actualizarInspeccion";
  private apiGetInspeccionInspectores = this.api.getBaseUrl + "inspec/inspeccion/getInspeccionInspectores";
  private apiCreateInspeccionInspector = this.api.getBaseUrl + "inspec/inspeccion/crearInspeccionInspector";
  private apiUpdateInspeccionInspector = this.api.getBaseUrl + "inspec/inspeccion/actualizarInspeccionInspector";
  private apiDeleteInspeccionInspector = this.api.getBaseUrl + "inspec/inspeccion/eliminarInspeccionInspector";
  private apiGetInspeccionObservadores = this.api.getBaseUrl + "inspec/inspeccion/getInspeccionObservadores";
  private apiCreateInspeccionObservador = this.api.getBaseUrl + "inspec/inspeccion/crearInspeccionObservador";
  private apiUpdateInspeccionObservador = this.api.getBaseUrl + "inspec/inspeccion/actualizarInspeccionObservador";
  private apiDeleteInspeccionObservador = this.api.getBaseUrl + "inspec/inspeccion/eliminarInspeccionObservador";
  private apiGetInspeccionParticulares = this.api.getBaseUrl + "inspec/inspeccion/getInspeccionParticulares";
  private apiCreateInspeccionParticular = this.api.getBaseUrl + "inspec/inspeccion/crearInspeccionParticular";
  private apiUpdateInspeccionParticular = this.api.getBaseUrl + "inspec/inspeccion/actualizarInspeccionParticular";
  private apiDeleteInspeccionParticular = this.api.getBaseUrl + "inspec/inspeccion/eliminarInspeccionParticular";
  private apiGetInspeccionTecnicos = this.api.getBaseUrl + "inspec/inspeccion/getInspeccionTecnicos";
  private apiCreateInspeccionTecnico = this.api.getBaseUrl + "inspec/inspeccion/crearInspeccionTecnico";
  private apiUpdateInspeccionTecnico = this.api.getBaseUrl + "inspec/inspeccion/actualizarInspeccionTecnico";
  private apiDeleteInspeccionTecnico = this.api.getBaseUrl + "inspec/inspeccion/eliminarInspeccionTecnico";
  private apiCreatePlanInspeccion = this.api.getBaseUrl + "inspec/inspeccion/crearPlanInspeccion";
  private apiUpdatePlanInspeccion = this.api.getBaseUrl + "inspec/inspeccion/actualizarPlanInspeccion";
  private apiCreateActividadPlanInspeccion = this.api.getBaseUrl + "inspec/inspeccion/crearActividadPlanInspeccion";
  private apiUpdateActividadPlanInspeccion = this.api.getBaseUrl + "inspec/inspeccion/actualizarActividadPlanInspeccion";

  constructor(private http: HttpClient, private api: ApiService) { }

  getInspecciones(): Observable<any> {
    return this.http.get<any>(this.apiGetInspecciones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getUnidadDependencias(): Observable<any> {
    return this.http.get<any>(this.apiGetUnidadDependencias, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getPlanInspecciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPlanInspecciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getActividadesPlanInspecciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetActividadesPlanInspecciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getProcesosSubProcesos(): Observable<any> {
    return this.http.get<any>(this.apiGetProcesosSubProcesos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getCriterios(): Observable<any> {
    return this.http.get<any>(this.apiGetCriterios, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getFuncionarios(): Observable<any> {
    return this.http.get<any>(this.apiGetFuncionarios, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getResponsables(): Observable<any> {
    return this.http.get<any>(this.apiGetResponsables, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getTipoInspeccion(): Observable<any> {
    return this.http.get<any>(this.apiGetTipoInspeccion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspeccionInspectores(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetInspeccionInspectores, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createInspeccionInspector(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateInspeccionInspector, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateInspeccionInspector(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateInspeccionInspector, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  deleteInspeccionInspector(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteInspeccionInspector, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspeccionObservadores(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetInspeccionObservadores, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createInspeccionObservador(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateInspeccionObservador, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateInspeccionObservador(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateInspeccionObservador, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  deleteInspeccionObservador(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteInspeccionObservador, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspeccionParticulares(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetInspeccionParticulares, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createInspeccionParticular(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateInspeccionParticular, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateInspeccionParticular(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateInspeccionParticular, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  deleteInspeccionParticular(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteInspeccionParticular, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspeccionTecnicos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetInspeccionTecnicos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createInspeccionTecnico(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateInspeccionTecnico, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateInspeccionTecnico(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateInspeccionTecnico, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  deleteInspeccionTecnico(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteInspeccionTecnico, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createPlanInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreatePlanInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updatePlanInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdatePlanInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createActividadPlanInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateActividadPlanInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateActividadPlanInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateActividadPlanInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
