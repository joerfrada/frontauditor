import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiGetRoles = this.api.getBaseUrl + "config/roles";
  private apiChangePassword = this.api.getBaseUrl + "config/changePassword";
  private apiResetPassword = this.api.getBaseUrl + "config/resetPassword";

  constructor(private http: HttpClient, private api: ApiService) { }

  getRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRoles, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateChangePassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiChangePassword, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiResetPassword, data, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
