import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private apiGetProcesos = this.api.getBaseUrl + "param/procesos";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getProcesos(): Observable<any> {
    return this.http.get<any>(this.apiGetProcesos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
