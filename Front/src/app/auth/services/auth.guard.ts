import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from '../../shared/utils/localstorage.utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canActivate() {
    // if (this.localStorageUtils && this.localStorageUtils.obterTokenUsuario()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }
}
