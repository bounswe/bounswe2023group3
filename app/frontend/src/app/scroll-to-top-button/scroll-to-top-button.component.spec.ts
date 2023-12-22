import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopButtonComponent } from './scroll-to-top-button.component';

describe('ScrollToTopButtonComponent', () => {
  let component: ScrollToTopButtonComponent;
  let fixture: ComponentFixture<ScrollToTopButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollToTopButtonComponent]
    });
    fixture = TestBed.createComponent(ScrollToTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
