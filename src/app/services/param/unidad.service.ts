import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private apiGetUnidades = this.api.getBaseUrl + "param/unidades";
  private apiCrearUnidades = this.api.getBaseUrl + "param/unidad/crearUnidades";
  private apiActualizarUnidades = this.api.getBaseUrl + "param/unidad/actualizarUnidades";
  private apiGetUnidadesById = this.api.getBaseUrl + "param/unidad/getUnidadesById";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getUnidades(): Observable<any> {
    return this.http.get<any>(this.apiGetUnidades, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUnidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiCrearUnidades, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUnidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiActualizarUnidades, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUnidadesById(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUnidadesById, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
