// =========================
// 📦 Product Service (FINAL FIXED)
// =========================
// Cell 1

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // =====================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =====================================
  private readonly BASE_URL =
    'https://backend-product-service-production.up.railway.app';

  // ✅ APIs
  private readonly CUSTOMER_API = `${this.BASE_URL}/api/angularProduct`;
  private readonly SELLER_API = `${this.BASE_URL}/api/v1/products`;

  constructor(private http: HttpClient) {}

  // =========================
  // 🔐 AUTH HEADER (FIXED)
  // =========================
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    console.log("🔥 TOKEN USED:", token); // DEBUG

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // =====================================================
  // 🟢 CUSTOMER APIs (NO TOKEN)
  // =====================================================

  // 📦 GET ALL PRODUCTS
  getProductList(): Observable<Product[]> {
    console.log("✅ GET PRODUCTS API CALLED");
    return this.http.get<Product[]>(`${this.CUSTOMER_API}/get`);
  }

  // 🔍 GET SINGLE PRODUCT
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.CUSTOMER_API}/get/${id}`);
  }

  // =====================================================
  // 🔴 SELLER APIs (JWT REQUIRED)
  // =====================================================

  // ➕ ADD PRODUCT (FINAL FIX)
  addProduct(payload: any): Observable<any> {
    console.log("🚀 ADD PRODUCT CALLED", payload);

    return this.http.post(
      `${this.SELLER_API}/add`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // 📦 ADD VARIANT / STOCK
  addVariant(productId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.SELLER_API}/${productId}/variants`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }
}
