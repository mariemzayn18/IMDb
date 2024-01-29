import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  //------------ Sending signin request.
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.signInAPI, {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(res.token, res.expiresIn);
        })
      );
  }

  //------------ Sending signup request.
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.signUpAPI, {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(res.token, res.expiresIn);
        })
      );
  }

  //----------- Logging out, either manually or due to token's expired.
  logout() {
    this.user.next(null);

    this.router.navigate(['']);
    localStorage.removeItem('userData');

    // clear timer if any.
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  //------------ Authenticate user and save his data.

  private handleAuthentication(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const currentlyLoggedInUser = new User(token, expirationDate);

    // publish the currently logged in user
    this.user.next(currentlyLoggedInUser);

    // call autoLogout method to logout the user when his token expires.
    this.autoLogout(expiresIn * 1000);

    // Save the currently logged in user data, in order not to losing them when reloading.
    localStorage.setItem('userData', JSON.stringify(currentlyLoggedInUser));
  }

  //------------ Retrieve user's data from local storage if he was authenticated
  retrieveUserData() {
    const userDataString = localStorage.getItem('userData');
    const userData: {
      _token: string;
      _tokenExpirationDate: string;
    } = userDataString ? JSON.parse(userDataString) : null;

    if (!userData) return;

    const loadedUser = new User(
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      // call autoLogout method to logout the user when his token expires.
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  //------------ Display a meaningful error messages for the user when signup/login.
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';

    // when network is lost..
    if (!error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (error.error.errorCode) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'BAD_CREDENTIALS':
        errorMessage = 'Incorrect email or password. Please try again.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
