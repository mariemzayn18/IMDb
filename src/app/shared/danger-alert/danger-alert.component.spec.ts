import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerAlertComponent } from './danger-alert.component';

describe('DangerAlertComponent', () => {
  let component: DangerAlertComponent;
  let fixture: ComponentFixture<DangerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DangerAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DangerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
