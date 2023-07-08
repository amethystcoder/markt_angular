import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDeliveriesComponent } from './pending-deliveries.component';

describe('PendingDeliveriesComponent', () => {
  let component: PendingDeliveriesComponent;
  let fixture: ComponentFixture<PendingDeliveriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDeliveriesComponent]
    });
    fixture = TestBed.createComponent(PendingDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
