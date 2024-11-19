import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    const colned = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
    return next(colned);
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigateByUrl('login');
        }
      }

      return throwError(() => {
        err;
      });
    })
  );
};
