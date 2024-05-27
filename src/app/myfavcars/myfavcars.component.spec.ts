import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavcarsComponent } from './myfavcars.component';

describe('MyfavcarsComponent', () => {
  let component: MyfavcarsComponent;
  let fixture: ComponentFixture<MyfavcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyfavcarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyfavcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
