// =========================
// 📦 Product Service (FINAL)
// Supports:
// - Customer APIs (Public)
// - Seller APIs (Protected - JWT)
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
  // 🌱 LOCAL BACKEND (COMMENTED)
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5002/api/angularProduct';

  // private readonly LOCAL_SELLER_URL =
  //   'http://127.0.0.1:5002/api/v1/products';

  // =====================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =====================================
  private readonly RAILWAY_BASE_URL =
    'https://backend-product-service-production.up.railway.app/api/angularProduct';

  private readonly RAILWAY_SELLER_URL =
    'https://backend-product-service-production.up.railway.app/api/v1/products';

  // ✅ ACTIVE URLS
  private readonly baseUrl = this.RAILWAY_BASE_URL;     // Customer APIs
  private readonly sellerUrl = this.RAILWAY_SELLER_URL; // Seller APIs

  constructor(private http: HttpClient) {}

  // =========================
  // 🔐 COMMON AUTH HEADER
  // =========================
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // =====================================================
  // 🟢 CUSTOMER APIs (NO TOKEN REQUIRED)
  // =====================================================

  // 📦 GET ALL PRODUCTS
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  // 🔍 GET SINGLE PRODUCT
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  // =====================================================
  // 🔴 SELLER APIs (JWT REQUIRED)
  // =====================================================

  // ➕ ADD PRODUCT
  addProduct(payload: any): Observable<any> {
    return this.http.post(
      `${this.sellerUrl}/add`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // 📦 ADD VARIANT / STOCK
  addVariant(productId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.sellerUrl}/${productId}/variants`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // ✏️ UPDATE PRODUCT
  updateProduct(productId: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.sellerUrl}/${productId}`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // ❌ DELETE PRODUCT
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(
      `${this.sellerUrl}/${productId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
