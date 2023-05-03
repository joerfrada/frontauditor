import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private apiGetListasDinamicas = this.api.getBaseUrl + "param/listas";
  private apiCrearLista = this.api.getBaseUrl + "param/lista/crearLista";
  private apiActualizarLista = this.api.getBaseUrl + "param/lista/actualizarLista";
  private apiObtenerListas = this.api.getBaseUrl + "param/lista/getListasById";
  private apiGetListaDetalleFull = this.api.getBaseUrl + "param/lista/getListaDetalleFull";
  private apiCrearListaDetalle = this.api.getBaseUrl + "param/lista/crearListaDetalle";
  private apiActualizarListaDetalle = this.api.getBaseUrl + "param/lista/actualizarListaDetalle";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getListas(): Observable<any> {
    return this.http.get<any>(this.apiGetListasDinamicas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public crearLista(data:any): Observable<any> {
    return this.http.post<any>(this.apiCrearLista,data,
       this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public actualizarLista(data: any): Observable<any> {
    return this.http.post<any>(this.apiActualizarLista, data,
      this.api.getHttpOptions('g')).pipe(
        retry(1), catchError(this.api.errorHandle)
        );
  }

  public ObtenerListasDetalles(data: any): Observable<any> {
    return this.http.post<any>(this.apiObtenerListas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getListaDetalleFull(): Observable<any> {
    return this.http.get<any>(this.apiGetListaDetalleFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public crearListaDetalle(data:any): Observable<any> {
    return this.http.post<any>(this.apiCrearListaDetalle,data,
       this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public actualizarListaDetalle(data: any): Observable<any> {
    return this.http.post<any>(this.apiActualizarListaDetalle, data,
      this.api.getHttpOptions('g')).pipe(
        retry(1), catchError(this.api.errorHandle)
        );
  }
}
