import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfetchedcarsComponent } from './allfetchedcars.component';

describe('AllfetchedcarsComponent', () => {
  let component: AllfetchedcarsComponent;
  let fixture: ComponentFixture<AllfetchedcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllfetchedcarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllfetchedcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
