import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastService = inject(ToastService);

  // Generate unique request ID
  const reqId = `${req.method}:${req.url}:${Date.now()}:${Math.random()}`;

  loadingService.show(reqId);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse && req.method !== 'GET') {
          const body = event.body as any;
          if (body?.message) {
            toastService.success(body.message);
          } else {
            toastService.success('Operation completed successfully');
          }
        }
      },
    }),
    catchError((err) => {
      const errorMsg = err?.error?.error || err?.error?.message || err?.message || 'A network error occurred.';
      toastService.error(errorMsg);
      return throwError(() => err);
    }),
    finalize(() => {
      loadingService.hide(reqId);
    })
  );
};
