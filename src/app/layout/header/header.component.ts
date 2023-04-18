import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router, private loginService: LoginService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout().subscribe(data => {});
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/']);    
    }, 100);    
  }

  toggleDropdown() {
    $('.dropdown-menu').toggleClass('dropdown-open');
  }
}
