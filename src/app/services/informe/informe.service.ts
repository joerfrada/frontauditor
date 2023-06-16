import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private apiPlanInspeccionPreview = this.api.getInforme + "planinspeccion/view/";
  private apiPlanInspeccion = this.api.getInforme + "planinspeccion/";

  constructor(private http: HttpClient, private api: ApiService) { }

  getInformePlanInspeccionPreview(id: any) {
    return this.apiPlanInspeccionPreview + id.toString();
  }

  getInformePlanInspeccion(id: any) {
    return this.apiPlanInspeccion + id.toString();
  }
}
