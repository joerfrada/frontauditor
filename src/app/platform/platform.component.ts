import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    $(document).ready(function () {
      $("#menubar").hover(function () {
        $('#menubar').toggleClass("menubar-visible");
      });
    });
  }

}
