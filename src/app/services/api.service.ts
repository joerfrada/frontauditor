import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

declare var Swal:any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url = "http://localhost/";
  private url = "https://auditorigefa.fac.mil.co/";
  private baseurl = this.url + "apiauditor/api/";
  private informe = this.url + "apiauditor/informe/";
  public url_image = this.url + "apiauditor/public/secad/Personal/Fotos/";
  public url_file = this.url + "apiauditor/public/files/";
  public url_file_seg = this.url + "apiauditor/public/files/seguim/";

  constructor() { }

  public getHttpOptions(tipo = 'l'): any {
    if (tipo == 'l') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        })
      };
    }
    else if (tipo == 'g') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Data-Type': 'json',
          // 'Accept': 'json',
          // 'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
        })
      };
    }
    else if (tipo == 'f') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          //'Accept': 'json',
        })
      };
    }
    else if (tipo == 'b') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        }),
        responseicon: 'blob' as 'json'
      };
    }
  }

  get getBaseUrl() {
    return this.baseurl;
  }

  get getInforme() {
    return this.informe;
  }

  /* Error Exceptions */
  public errorHandle(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.Message;
      Swal.fire({
        icon: 'error',
        text: errorMessage,
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
    }
    else {
      if (error.status === 401) {
        errorMessage = "Su sesión ha expirado. Intente conectarse nuevamente.";
        Swal.fire({
          title: 'ERROR AUTENTICACIÓN',
          icon: 'error',
          text: errorMessage,
          confirmButtonText: 'Aceptar'
        }).then((result: any) => {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 500);
        });
      }
      else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        Swal.fire({
          title: 'ERROR',
          icon: 'error',
          text: errorMessage,
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
      }
    }

    return throwError(errorMessage);
  }

  public ProcesarRespuesta(request: any) {
    if (request != undefined && request.tipo != 0 && request.tipo != -1) {
      Swal.fire({
        title: 'ERROR EN EL SISTEMA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
    if (request != undefined && request.tipo == -1) {
      Swal.fire({
        title: 'ADVERTENCIA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
    if (request != undefined && request.tipo == -1 && request.codigo == 2) {
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: request.mensaje,
        confirmButtonText: 'Aceptar'
      }).then((result: any) => {
        setTimeout(() => {
          localStorage.clear();
          location.href = 'https://auditorigefa.fac.mil.co/apiauditor/logout';
        }, 10);
      });
    }

    return request;
  }
}
