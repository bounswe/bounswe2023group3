import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationForBadgesComponent } from './annotation-for-badges.component';

describe('AnnotationForBadgesComponent', () => {
  let component: AnnotationForBadgesComponent;
  let fixture: ComponentFixture<AnnotationForBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationForBadgesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnotationForBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
