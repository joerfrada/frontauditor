import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() items?: string;

  lstItems: any = [];

  constructor() { }

  ngOnInit(): void {
    if (this.items) {
      this.lstItems = this.items.split(',');
    }
  }

}
