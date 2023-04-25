import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiGetEmpresasActivas = this.api.getBaseUrl + "unidad/empresas_activos";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getEmpresasActivas(): Observable<any> {
    return this.http.get<any>(this.apiGetEmpresasActivas, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
