// =========================
// 📦 Product Service (FINAL FIXED)
// =========================
// Cell 1

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BASE_URL =
    'https://backend-product-service-ncl2.onrender.com';

  private readonly CUSTOMER_API = `${this.BASE_URL}/api/angularProduct`;
  private readonly SELLER_API = `${this.BASE_URL}/api/v1/products`;

  constructor(private http: HttpClient) {}

  // =========================
  // 🟢 CUSTOMER APIs
  // =========================

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.CUSTOMER_API}/get`);
  }

  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.CUSTOMER_API}/get/${id}`);
  }

  // =========================
  // 🔴 SELLER APIs
  // =========================

  addProduct(payload: any): Observable<any> {
    return this.http.post(
      `${this.SELLER_API}/add`,
      payload
    );
  }

  addVariant(productId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.SELLER_API}/${productId}/variants`,
      payload
    );
  }
}
