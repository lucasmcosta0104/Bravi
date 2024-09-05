import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${err.error.message}`;
      } else {
        errorMessage = `Código do erro: ${err.status}\nMensagem: ${err.message}`;
      }
      return throwError(() => new Error(errorMessage));
    })
  );
};
