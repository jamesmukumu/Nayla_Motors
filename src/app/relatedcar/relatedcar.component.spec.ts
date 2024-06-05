import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedcarComponent } from './relatedcar.component';

describe('RelatedcarComponent', () => {
  let component: RelatedcarComponent;
  let fixture: ComponentFixture<RelatedcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedcarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
