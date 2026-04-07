// =====================================================
// 🟦 REQUEST ID INTERCEPTOR – GLOBAL REQUEST TRACKING
// =====================================================

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestIdInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 🔥 Get existing OR create new Request ID
    let requestId = localStorage.getItem('REQUEST_ID');

    if (!requestId) {
      requestId = 'REQ-' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('REQUEST_ID', requestId);
    }

    // 🔥 Attach header
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Request-ID': requestId
      }
    });

    return next.handle(modifiedReq);
  }
}