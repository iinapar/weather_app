import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css',
})
export class CurrentWeatherComponent {
  @Input()
  currentWeather: any;
  @Input()
  widgets: any;
  @Input()
  temperatureUnit: any;

  @Output()
  onSetTemperatureType: EventEmitter<string> = new EventEmitter<string>();

  setTemperatureUnit(value: string) {
    this.onSetTemperatureType.emit(value);
  }
}
