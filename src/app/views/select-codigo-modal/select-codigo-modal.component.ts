import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-codigo-modal',
  templateUrl: './select-codigo-modal.component.html',
  styleUrls: ['./select-codigo-modal.component.scss']
})
export class SelectCodigoModalComponent implements OnInit {

  @ViewChild('input', { static: false }) private input!: ElementRef;

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

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.array = this.arrayTemp;
    }
    else {
      this.array = this.arrayTemp.filter((x: any) => {
        if (x.item1.toString().toLowerCase().indexOf(filter) !== -1 ||
            x.item2.toString().toLowerCase().indexOf(filter) !== -1) {
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
