import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-user-modal',
  templateUrl: './select-user-modal.component.html',
  styleUrls: ['./select-user-modal.component.scss']
})
export class SelectUserModalComponent implements OnInit {

  @Input() title?: string;
  @Input() show?: Boolean;
  @Input() array?: any;
  @Input() arrayTemp?: any;
  @Input() size?: string = 'modal-md';
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

  clickData(data: any) {
    this.output.emit(data);
  }

  refreshDato() {
    this.array = this.arrayTemp;
  }

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.array = this.arrayTemp;
    }
    else {
      this.array = this.arrayTemp.filter((item: any) => {
        if (item.item.toString().toLowerCase().indexOf(filter) !== -1) {
              return true;
        }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.array = this.arrayTemp;
    }
  }

}
