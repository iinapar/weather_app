import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DialogData } from '../air-pollution.component';

@Component({
  selector: 'app-air-pollution-settings-dialog',
  templateUrl: './air-pollution-settings-dialog.component.html',
  styleUrl: './air-pollution-settings-dialog.component.css',
})
export class AirPollutionSettingsDialogComponent {
  airComponentsForm!: FormGroup;
  chartType: string;
  airComponents: any;
  @Output()
  onSetChartType: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onSetSelectedAirComponents: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: DialogRef<AirPollutionSettingsDialogComponent>,
    @Inject(DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {
    this.airComponents = data.components;
    this.chartType = data.chart;
  }

  ngOnInit() {
    this.airComponentsForm = this.formBuilder.group(this.airComponents);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCheckboxChange(): void {
    const selectedAirComponents = this.airComponentsForm.value;
    this.onSetSelectedAirComponents.emit(selectedAirComponents);
  }

  setChartType(value: string): void {
    this.onSetChartType.emit(value);
  }
}
