import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageUtils } from '../../shared/utils/localstorage.utils';
import { AlertService } from '../../shared/services/alert/alert.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected UrlServiceV1: string = environment.apiUrlv1;

  constructor(private httpClient: HttpClient, protected alertService: AlertService,) { }
  public LocalStorage = new LocalStorageUtils();

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage?.obterTokenUsuario()}`,
      }),
    };
  }

  protected extractData(response: any) {
    return response || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];
    const customResponse = { error: { errors: [] } };
    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    if (response.status === 500) {
      customError.push('Ocorreu um erro no processamento.');

      customResponse.error.errors = customError as never;
      return throwError(() => customResponse);
    }
    return throwError(() => response);
  }

  protected defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });


  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(`${this.UrlServiceV1}/${endpoint}`, {
      headers: this.defaultHeaders,
      params: params
    });
  }

  protected post<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.post<T>(`${this.UrlServiceV1}/${endpoint}`, body, {
      headers: this.defaultHeaders ,
      params: params
    });
  }

  protected put<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.put<T>(`${this.UrlServiceV1}/${endpoint}`, body, {
      headers: this.defaultHeaders,
      params: params
    });
  }

  protected delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(`${this.UrlServiceV1}/${endpoint}`, {
      headers: this.defaultHeaders,
      params: params
    });
  }

  protected deleteMultiplos<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(`${this.UrlServiceV1}/${endpoint}`, {
      headers: this.defaultHeaders,
      params: params
    });
  }

  protected options<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.httpClient.options<T>(`${this.UrlServiceV1}/${endpoint}`, {
      headers:this.defaultHeaders,
      params: params,
      observe: 'response'
    });
  }
}
