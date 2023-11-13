import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersProfileComponent } from './others-profile.component';

describe('OthersProfileComponent', () => {
  let component: OthersProfileComponent;
  let fixture: ComponentFixture<OthersProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersProfileComponent]
    });
    fixture = TestBed.createComponent(OthersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
