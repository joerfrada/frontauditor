import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  constructor(private http: HttpClient, private api: ApiService) { }

  private apiGetUnidades = this.api.getBaseUrl + "admin/unidad";
  private apiCrearUnidades = this.api.getBaseUrl + "admin/unidad/crearunidad";
  private apiActualizarUnidades = this.api.getBaseUrl + "admin/unidad/actualizarunidad";
  private apiObtenerByIdUnidades = this.api.getBaseUrl + "admin/unidad/obtenerunidadesByid";

  public getUnidades(): Observable<any> {
    return this.http.get<any>(this.apiGetUnidades, 
      this.api.getHttpOptions('g')).pipe(retry(1), 
        catchError(this.api.errorHandle)
      );
  }

  public CrearUnidad(data: any): Observable<any> {
    return this.http.post<any>(this.apiCrearUnidades, data, 
      this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public ActualizarUnidad(data: any): Observable<any> {
    return this.http.post<any>(this.apiActualizarUnidades, data,
       this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public ObtenerUnidadByID(data: any): Observable<any> {
    return this.http.post<any>(this.apiObtenerByIdUnidades, data, 
      this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}