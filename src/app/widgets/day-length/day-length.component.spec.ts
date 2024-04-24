import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLengthComponent } from './day-length.component';

describe('DayLengthComponent', () => {
  let component: DayLengthComponent;
  let fixture: ComponentFixture<DayLengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayLengthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
