import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BaseGuard } from '../../../core/guards/base.guard';

@Injectable({ providedIn: 'root' })
export class ContatoGuard extends BaseGuard implements CanActivate {
  canActivate(routeAc: ActivatedRouteSnapshot): boolean {
    return super.validarClaims(routeAc);
  }
}