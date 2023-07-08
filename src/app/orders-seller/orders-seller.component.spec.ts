import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSellerComponent } from './orders-seller.component';

describe('OrdersSellerComponent', () => {
  let component: OrdersSellerComponent;
  let fixture: ComponentFixture<OrdersSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersSellerComponent]
    });
    fixture = TestBed.createComponent(OrdersSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
