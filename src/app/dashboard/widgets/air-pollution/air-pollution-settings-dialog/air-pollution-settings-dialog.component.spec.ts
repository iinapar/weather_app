import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPollutionSettingsDialogComponent } from './air-pollution-settings-dialog.component';

describe('AirPollutionSettingsDialogComponent', () => {
  let component: AirPollutionSettingsDialogComponent;
  let fixture: ComponentFixture<AirPollutionSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirPollutionSettingsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirPollutionSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
