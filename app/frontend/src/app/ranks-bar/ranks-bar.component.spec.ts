import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanksBarComponent } from './ranks-bar.component';

describe('RanksBarComponent', () => {
  let component: RanksBarComponent;
  let fixture: ComponentFixture<RanksBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RanksBarComponent]
    });
    fixture = TestBed.createComponent(RanksBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
