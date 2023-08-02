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
  private apiCreateSeguimientos = this.api.getBaseUrl + "seguim/seguimiento/crearSeguimientos";
  private apiUpdateSeguimientos = this.api.getBaseUrl + "seguim/seguimiento/actualizarSeguimientos";

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

  createSeguimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateSeguimientos, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateSeguimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateSeguimientos, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
