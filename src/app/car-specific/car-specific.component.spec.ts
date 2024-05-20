import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSpecificComponent } from './car-specific.component';

describe('CarSpecificComponent', () => {
  let component: CarSpecificComponent;
  let fixture: ComponentFixture<CarSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarSpecificComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
