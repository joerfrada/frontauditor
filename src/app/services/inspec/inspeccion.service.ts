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
  private apiGetPlanInspecciones = this.api.getBaseUrl + "inspec/inspeccion/getPlanInspecciones";
  private apiGetActividadesPlanInspecciones = this.api.getBaseUrl + "inspec/inspeccion/getActividadesPlanInspeccion";
  private apiGetProcesosSubProcesos = this.api.getBaseUrl + "inspec/inspeccion/getProcesosSubprocesos";

  constructor(private http: HttpClient, private api: ApiService) { }

  getInspecciones(): Observable<any> {
    return this.http.get<any>(this.apiGetInspecciones, this.api.getHttpOptions('g'))
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
}
