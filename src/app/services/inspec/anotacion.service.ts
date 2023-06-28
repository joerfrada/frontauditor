import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  private apiGetAnotaciones = this.api.getBaseUrl + "inspec/anotacion/getAnotaciones";
  private apiGetDependenciasLDAP = this.api.getBaseUrl + "inspec/anotacion/getDependenciasLDAP";
  private apiGetUsersLDAP = this.api.getBaseUrl + "inspec/anotacion/getUsersLDAP";
  private apiGetTipoAnotacion = this.api.getBaseUrl + "inspec/anotacion/getTipoAnotacion";
  private apiGetTemaCatalogacion = this.api.getBaseUrl + "inspec/anotacion/getTemaCatalogacion";
  private apiGetProcesosInternos = this.api.getBaseUrl + "inspec/anotacion/getProcesosInternos";
  private apiGetFuenteAnotacion = this.api.getBaseUrl + "inspec/anotacion/getFuenteAnotacion";
  private apiGetProgramaCalidad = this.api.getBaseUrl + "inspec/anotacion/getProgramaCalidad";
  private apiGetCriticidadAnotacion = this.api.getBaseUrl + "inspec/anotacion/getCriticidadAnotacion";
  private apiGetClaseAnotacion = this.api.getBaseUrl + "inspec/anotacion/getClaseAnotacion";
  private apiGetInspecciones = this.api.getBaseUrl + "inspec/anotacion/getInspecciones";
  private apiGetConsecutivoHallazgo = this.api.getBaseUrl + "inspec/anotacion/getConsecutivoHallazgo";
  private apiGetCriteriosInspeccion = this.api.getBaseUrl + "inspec/anotacion/getCriteriosInspeccion";
  private apiCreateAnotacion = this.api.getBaseUrl + "inspec/anotacion/crearAnotacion";
  private apiUpdateAnotacion = this.api.getBaseUrl + "inspec/anotacion/actualizarAnotacion";
  private apiCreateAnotacionCorreccion = this.api.getBaseUrl + "inspec/anotacion/crearAnotacionCorreccion";
  private apiUpdateAnotacionCorrecion = this.api.getBaseUrl + "inspec/anotacion/actualizarAnotacionCorreccion";
  private apiCreateAnotacionMejoramiento = this.api.getBaseUrl + "inspec/anotacion/crearAnotacionMejoramiento";
  private apiUpdateAnotacionMejoramiento = this.api.getBaseUrl + "inspec/anotacion/actualizarAnotacionMejoramiento";
  private apiCreateAnotacionOrden = this.api.getBaseUrl + "inspec/anotacion/crearAnotacionOrden";
  private apiUpdateAnotacionOrden = this.api.getBaseUrl + "inspec/anotacion/actualizarAnotacionOrden";

  constructor(private http: HttpClient, private api: ApiService) { }

  getAnotaciones(): Observable<any> {
    return this.http.get<any>(this.apiGetAnotaciones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getDependenciasLDAP(): Observable<any> {
    return this.http.get<any>(this.apiGetDependenciasLDAP, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getFuncionariosLDAP(): Observable<any> {
    return this.http.get<any>(this.apiGetUsersLDAP, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getTipoAnotacion(): Observable<any> {
    return this.http.get<any>(this.apiGetTipoAnotacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getTemaCatalogacion(): Observable<any> {
    return this.http.get<any>(this.apiGetTemaCatalogacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getProcesosInternos(): Observable<any> {
    return this.http.get<any>(this.apiGetProcesosInternos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getFuenteAnotacion(): Observable<any> {
    return this.http.get<any>(this.apiGetFuenteAnotacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getProgramaCalidad(): Observable<any> {
    return this.http.get<any>(this.apiGetProgramaCalidad, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getCriticidadAnotacion(): Observable<any> {
    return this.http.get<any>(this.apiGetCriticidadAnotacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getClaseAnotacion(): Observable<any> {
    return this.http.get<any>(this.apiGetClaseAnotacion, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getInspecciones(): Observable<any> {
    return this.http.get<any>(this.apiGetInspecciones, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getConsecutivoHallazgo(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetConsecutivoHallazgo, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getCriteriosInspeccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCriteriosInspeccion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createAnotacion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAnotacion, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateAnotacion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAnotacion, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createAnotacionCorreccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAnotacionCorreccion, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateAnotacionCorreccion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAnotacionCorrecion, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createAnotacionMejoramiento(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAnotacionMejoramiento, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateAnotacionMejoramiento(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAnotacionMejoramiento, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createAnotacionOrden(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAnotacionOrden, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateAnotacionOrden(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAnotacionOrden, data)
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
