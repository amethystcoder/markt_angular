import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerHomeComponent } from './buyer-home.component';

describe('BuyerHomeComponent', () => {
  let component: BuyerHomeComponent;
  let fixture: ComponentFixture<BuyerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
