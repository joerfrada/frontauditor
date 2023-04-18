import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {

  private apiGetCriterios = this.api.getBaseUrl + "param/criterios";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getCriterios(): Observable<any> {
    return this.http.get<any>(this.apiGetCriterios, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
