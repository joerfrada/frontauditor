import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private apiGetListasDinamicas = this.api.getBaseUrl + "param/listasdinamicas ";
  private apiCrearLista = this.api.getBaseUrl + "param/ld/crearLD";
  private apiActualizarLista = this.api.getBaseUrl + "param/ld/actualizarLD";
  private apiObtenerListas = this.api.getBaseUrl + "param/ld/getListasById";
  private apiCrearListah = this.api.getBaseUrl + "param/ld/crearLDh";
  private apiActualizarListah = this.api.getBaseUrl + "param/ld/actualizarLDh";

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

  public ObtenerListas(data: any): Observable<any> {
    return this.http.post<any>(this.apiObtenerListas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public crearListah(data:any): Observable<any> {
    return this.http.post<any>(this.apiCrearListah,data,
       this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public actualizarListah(data: any): Observable<any> {
    return this.http.post<any>(this.apiActualizarListah, data,
      this.api.getHttpOptions('g')).pipe(
        retry(1), catchError(this.api.errorHandle)
        );
  }
}
