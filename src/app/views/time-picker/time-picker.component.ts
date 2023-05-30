import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'timepicker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements AfterViewInit {
  
  show: any = false;
  hour: any = [];
  minute: any = [];

  ngAfterViewInit(): void {
    for (let i = 0; i < 24; i++) {
      let hh = i < 10 ? '0' + i.toString() : i.toString();
      this.hour.push(hh);
    }

    for (let j = 0; j < 60; j++) {
      let mm = j < 10 ? '0' + j.toString() : j.toString();
      this.minute.push(mm);
    }
  }

  openTimePicker() {
    this.show = true;
  }

}
