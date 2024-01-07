import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UnauthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return this.router.createUrlTree(['/movies/top-movies-catalog']);
        }
        return true;
      })
    );
  }
}

export const unauthGuardFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => inject(UnauthGuard).canActivate(route, state);
