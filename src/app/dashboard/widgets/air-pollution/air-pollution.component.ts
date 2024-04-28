import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AirPollutionSettingsDialogComponent } from './air-pollution-settings-dialog/air-pollution-settings-dialog.component';

export interface DialogData {
  chart: any;
  chartType: any;
  components: any;
}

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.css',
})
export class AirPollutionComponent {
  @Input()
  airPollution: any;
  @Input()
  airPollutionComponents: any[] = [];
  @Input()
  selectedAirComponents: any;
  @Input()
  chartType: any;
  @Input()
  airComponents: any;

  @Output()
  onSetChartType: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onSetSelectedAirComponents: EventEmitter<any> = new EventEmitter<any>();

  // Chart options
  view: [number, number] = [500, 250];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor(public dialog: MatDialog) {}

  openCheckboxDialog(): void {
    const dialogRef = this.dialog.open(AirPollutionSettingsDialogComponent, {
      width: '350px',
      data: {
        chart: this.chartType,
        components: this.airComponents,
      },
    });

    dialogRef.componentInstance.onSetChartType.subscribe((data: any) => {
      this.setChartType(data);
    });
    dialogRef.componentInstance.onSetSelectedAirComponents.subscribe(
      (data: any) => {
        this.setSelectedComponents(data);
      }
    );
  }

  labelFormatting(c: any) {
    return `${c.value} μg/m3`;
  }

  setChartType(value: any): void {
    this.onSetChartType.emit(value);
  }

  setSelectedComponents(components: any): void {
    this.onSetSelectedAirComponents.emit(components);
  }
}
