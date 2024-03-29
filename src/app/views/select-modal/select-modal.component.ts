import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {

  @ViewChild('input', { static: false }) private input!: ElementRef;

  @Input() title?: string;
  @Input() titleHeader?: string;
  @Input() show?: Boolean;
  @Input() array?: any;
  @Input() arrayTemp?: any;
  @Input() size?: string = 'modal-md';
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  arrTitle: any = [];

  constructor() { }

  ngOnInit(): void {
    if (this.titleHeader == undefined) this.arrTitle.length = 0;
    else this.arrTitle = this.titleHeader?.split(',');
  }

  closeModal() {
    this.close.emit(false);
  }

  clickData(data: any) {
    this.output.emit(data);
  }

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.array = this.arrayTemp;
    }
    else {
      this.array = this.arrayTemp.filter((x: any) => {
        if (x.item2 == null || x.item3 == null) {
          if (x.item1.toString().toLowerCase().indexOf(filter) !== -1) {
            return true;
          }
        }
        else if (x.item3 == null) {
          if (x.item1.toString().toLowerCase().indexOf(filter) !== -1 ||
              x.item2.toString().toLowerCase().indexOf(filter) !== -1) {
            return true;
          }
        }
        else if (x.item2 != null || x.item3 != null) {
          if (x.item1.toString().toLowerCase().indexOf(filter) !== -1 ||
              x.item2.toString().toLowerCase().indexOf(filter) !== -1 ||
              x.item3.toString().toLowerCase().indexOf(filter) !== -1) {
            return true;
          }
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