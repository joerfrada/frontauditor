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
}
