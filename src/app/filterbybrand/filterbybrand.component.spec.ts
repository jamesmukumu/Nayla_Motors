import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbybrandComponent } from './filterbybrand.component';

describe('FilterbybrandComponent', () => {
  let component: FilterbybrandComponent;
  let fixture: ComponentFixture<FilterbybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterbybrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
