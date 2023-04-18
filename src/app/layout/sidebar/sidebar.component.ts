import { Component, OnInit } from '@angular/core';
import { Menu } from '../../modelos/menu.model';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  menus: Menu[] = [];

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    let menus = this.currentUser.menus;
    this.menus = menus;
  }

  ngOnInit(): void {
  }

  toggleExpanded(id: any) {
    $('.gui-folder-' + id).toggleClass('expanded');
  }

  toggleSubExpanded(id: any) {
    $('.gui-subfolder-' + id).toggleClass('expanded');
  }

}
