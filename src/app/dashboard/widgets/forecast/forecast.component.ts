import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
})
export class ForecastComponent {
  @Input()
  forecast: any;

  @Input()
  chartData: any;

  @Input()
  forecastfor24h: any;

  @Input()
  forecastType: any;

  @Output()
  onSetForecastType: EventEmitter<string> = new EventEmitter<string>();

  view: [number, number] = [400, 200];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;

  colorScheme = 'night';

  setForecastType(value: any): void {
    this.onSetForecastType.emit(value);
  }
}
