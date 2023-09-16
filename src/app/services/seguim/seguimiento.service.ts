import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  private apiGetSeguimientos = this.api.getBaseUrl + "seguim/seguimientos";
  private apiGetAnotaciones = this.api.getBaseUrl + "seguim/seguimiento/getAnotaciones";
  private apiGetInspecciones = this.api.getBaseUrl + "seguim/seguimiento/getInspecciones";
  private apiGetAnotacionCausaRaiz = this.api.getBaseUrl + "seguim/seguimiento/getAnotacionCausaRaiz";
  private apiGetAnotacionActividad = this.api.getBaseUrl + "seguim/seguimiento/getAnotacionActividad";
  private apiGetTemaCatalogacion = this.api.getBaseUrl + "seguim/seguimiento/getTemaCatalogacion";
  private apiGetConceptoEfectividad = this.api.getBaseUrl + "seguim/seguimiento/getConceptoEfectividad";
  private apiGetSeguimientoArchivo = this.api.getBaseUrl + "seguim/seguimiento/getSeguimientoArchivo";
  private apiGetFuncionarios = this.api.getBaseUrl + "seguim/seguimiento/getFuncionarios";
  private apiCreateSeguimientos = this.api.getBaseUrl + "seguim/seguimiento/crearSeguimientos";
  private apiUpdateSeguimientos = this.api.getBaseUrl + "seguim/seguimiento/actualizarSeguimientos";
  private apiGetEventos = this.api.getBaseUrl + "seguim/seguimiento/getEventos";
  private apiCreateEventos = this.api.getBaseUrl + "seguim/seguimiento/crearEventos";
  private apiUpdateEventos = this.api.getBaseUrl + "seguim/seguimiento/actualizarEventos";
  private apiDeleteEvento = this.api.getBaseUrl + "seguim/seguimiento/eliminarEvento";
  private apiExportSeguimientos = this.api.getBaseUrl + "seguim/seguimiento/exportarSeguimientos";

  constructor(private http: HttpClient, private api: ApiService) { }

  getSeguimientos(): Observable<any> {
    return this.http.get<any>(this.apiGetSeguimientos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getAnotaciones(): Observable<any> {
    return this.http.get<any>(this.apiGetAnotaciones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspecciones(): Observable<any> {
    return this.http.get<any>(this.apiGetInspecciones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getAnotacionCausaRaiz(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetAnotacionCausaRaiz, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getAnotacionActividad(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetAnotacionActividad, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getTemaCatalogacion(): Observable<any> {
    return this.http.get<any>(this.apiGetTemaCatalogacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getConceptoEfectividad(): Observable<any> {
    return this.http.get<any>(this.apiGetConceptoEfectividad, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getSeguimientoArchivo(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetSeguimientoArchivo, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getFuncionarios(): Observable<any> {
    return this.http.get<any>(this.apiGetFuncionarios, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createSeguimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateSeguimientos, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateSeguimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateSeguimientos, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getEventos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetEventos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createEventos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateEventos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateEventos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateEventos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  deleteEventos(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteEvento, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  exportSeguimientos(): Observable<any> {
    return this.http.get<any>(this.apiExportSeguimientos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
