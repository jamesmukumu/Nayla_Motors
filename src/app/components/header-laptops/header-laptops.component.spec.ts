import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLaptopsComponent } from './header-laptops.component';

describe('HeaderLaptopsComponent', () => {
  let component: HeaderLaptopsComponent;
  let fixture: ComponentFixture<HeaderLaptopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderLaptopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLaptopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
