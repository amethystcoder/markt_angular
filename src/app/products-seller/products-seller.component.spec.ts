import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSellerComponent } from './products-seller.component';

describe('ProductsSellerComponent', () => {
  let component: ProductsSellerComponent;
  let fixture: ComponentFixture<ProductsSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
