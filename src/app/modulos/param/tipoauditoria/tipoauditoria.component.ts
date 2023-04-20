import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { TipoauditoriaService} from '../../../services/param/tipoauditoria.service';

@Component({
  selector: 'app-tipoauditoria',
  templateUrl: './tipoauditoria.component.html',
  styleUrls: ['./tipoauditoria.component.scss']
})
export class TipoauditoriaComponent implements OnInit {

  varhistorial: any = [];
  varhistorialTemp: any = [];
  
  currentUser: any;

  constructor(private router: Router, private api: ApiService, private tipoauditoria: TipoauditoriaService) { }

  ngOnInit(): void {
    this.getTipoAuditorias();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.TipoAuditoria.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.Sigla.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }

  getTipoAuditorias() {
    this.tipoauditoria.getTipoAuditorias().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

}
