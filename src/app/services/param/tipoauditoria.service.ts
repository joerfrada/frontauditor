import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TipoauditoriaService {

  private apiGetTipoAuditorias = this.api.getBaseUrl + "param/tipoauditoria";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getTipoAuditorias(): Observable<any> {
    return this.http.get<any>(this.apiGetTipoAuditorias, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
