import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersComponent } from './delivery-orders.component';

describe('DeliveryOrdersComponent', () => {
  let component: DeliveryOrdersComponent;
  let fixture: ComponentFixture<DeliveryOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryOrdersComponent]
    });
    fixture = TestBed.createComponent(DeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
