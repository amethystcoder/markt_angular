import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderComponent } from './track-order.component';

describe('TrackOrderComponent', () => {
  let component: TrackOrderComponent;
  let fixture: ComponentFixture<TrackOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackOrderComponent]
    });
    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
