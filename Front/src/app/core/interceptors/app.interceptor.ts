import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from '../../shared/services/alert/alert.service';
import { LocalStorageUtils } from '../../shared/utils/localstorage.utils';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private alertService: AlertService) {}

  localStorageUtil = new LocalStorageUtils();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtil.limparDadosLocaisUsuario();
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: this.router.url },
            });
          }
          else if (error.status === 403) {
            this.router.navigate(['/acesso-negado']);
          }
          else if (error.error && error.error.errors) {
            this.alertService.showError(
              'Oooops! Algo deu errado.',
              error.error.errors.join('<br>')
            );
          } else {
            this.alertService.showError(
              'Oooops! Algo deu errado.',
              'Ocorreu um erro desconhecido.'
            );
          }
        }

        return throwError(() => error);
      })
    );
  }
}
