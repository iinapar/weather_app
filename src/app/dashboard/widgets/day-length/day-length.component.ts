import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-length',
  templateUrl: './day-length.component.html',
  styleUrl: './day-length.component.css',
})
export class DayLengthComponent {
  @Input()
  dayLength: any;
  @Input()
  cityInputValue: any;
}
