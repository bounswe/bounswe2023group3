import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSectionComponent } from './faq-section.component';

describe('FaqSectionComponent', () => {
  let component: FaqSectionComponent;
  let fixture: ComponentFixture<FaqSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSectionComponent]
    });
    fixture = TestBed.createComponent(FaqSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
