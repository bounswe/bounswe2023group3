import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorApplyComponent } from './moderator-apply.component';

describe('ModeratorApplyComponent', () => {
  let component: ModeratorApplyComponent;
  let fixture: ComponentFixture<ModeratorApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorApplyComponent]
    });
    fixture = TestBed.createComponent(ModeratorApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
