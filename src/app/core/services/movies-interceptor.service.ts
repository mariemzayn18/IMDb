import { HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class MoviesInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const lang = localStorage.getItem('lang');
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('language', lang || 'en'),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
