import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cityInputFormControl: FormControl = new FormControl('');

  @Input()
  airComponents: any;

  @Input()
  airPollution: any;

  @Input()
  airpollutionComponents: any;

  @Input()
  currentWeather: any;

  @Input()
  widgets: any;

  @Input()
  chartType: any;

  @Input()
  dayLength: any;

  @Input()
  temperatureUnit: any;

  @Input()
  initialState: any;

  @Input()
  cityInputValue: any;

  @Input()
  selectedAirComponents: any;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  resetToDefaultOrder: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateCityValue: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  setChartType: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  setTemperatureType: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  setSelectedAirComponents: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  types = [
    { type: 'metric', name: 'Celsius' },
    { type: 'imperial', name: 'Fahrenheit' },
    { type: '', name: 'Kelvin' },
  ];

  change(value: string) {
    this.onChange.emit(value);
  }

  defaultOrder() {
    this.resetToDefaultOrder.emit();
  }

  cityValue(value: any) {
    this.updateCityValue.emit(value);
  }

  changechartType(value: any) {
    this.setChartType.emit(value);
  }

  changeTemperatureType(value: any) {
    this.setTemperatureType.emit(value);
  }

  changeairComponents(value: any) {
    this.setSelectedAirComponents.emit(value);
  }
}
