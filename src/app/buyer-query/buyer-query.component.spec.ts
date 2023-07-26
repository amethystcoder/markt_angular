import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerQueryComponent } from './buyer-query.component';

describe('BuyerQueryComponent', () => {
  let component: BuyerQueryComponent;
  let fixture: ComponentFixture<BuyerQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerQueryComponent]
    });
    fixture = TestBed.createComponent(BuyerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
