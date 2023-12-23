import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtextAnnotationComponent } from './qtext-annotation.component';

describe('QtextAnnotationComponent', () => {
  let component: QtextAnnotationComponent;
  let fixture: ComponentFixture<QtextAnnotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QtextAnnotationComponent]
    });
    fixture = TestBed.createComponent(QtextAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
