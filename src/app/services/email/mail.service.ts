import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private apiEnviar = this.api.getBaseUrl + "enviar";

  constructor(private http: HttpClient, private api: ApiService) { }

  public enviarMail(data: any): Observable<any> {
    return this.http.post<any>(this.apiEnviar, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
