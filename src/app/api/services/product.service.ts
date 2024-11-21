import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  //   /products/new
  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/new`, data);
  }

  //  /product_request/new
  createProductRequest(data: ProductRequest): Observable<ProductRequest> {
    return this.http.post<ProductRequest>(
      `${this.apiUrl}/product_request/new`,
      data
    );
  }
  // /products/category/search/soap
  searchProductInCategory(
    categoryName: string,
    query: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products/${categoryName}/search/${query}`
    );
  }

  // http://localhost:5000/products/search/{product_name}
  searchProduct(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/search/${query}`);
  }

  //  http://localhost:5000/products/seller/a-seller-id
  getSellerProducts(sellerId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products/seller/${sellerId}`
    );
  }

  //   http://localhost:5000/products/random/{amount}
  getRandomProducts(amount: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/random/${amount}`);
  }

  //   /products/a-product-id
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  //  /products/a-product-id
  removeProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}products/${productId}`);
  }

  // /product_request/a-product-request-id
  deleteProductRequest(requestId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product_request/${requestId}`);
  }
}
