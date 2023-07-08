import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePasswordComponent } from './retrieve-password.component';

describe('RetrievePasswordComponent', () => {
  let component: RetrievePasswordComponent;
  let fixture: ComponentFixture<RetrievePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetrievePasswordComponent]
    });
    fixture = TestBed.createComponent(RetrievePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
