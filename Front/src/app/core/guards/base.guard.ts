import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageUtils } from '../../shared/utils/localstorage.utils';

@Injectable({ providedIn: 'root' })
export abstract class BaseGuard {
  private localStorageUtils = new LocalStorageUtils();

  constructor(protected router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
    // console.log(routeAc.data[0]['claim']);

    return true;
  }
}
