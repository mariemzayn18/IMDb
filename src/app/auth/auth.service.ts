import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from './user.model';

interface RegResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
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
      .post<RegResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  //------------ Sending signup request.
  signUp(email: string, password: string) {
    return this.http
      .post<RegResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  //----------- Logging out, either manually or due to token's expired.
  logout() {
    this.user.next(null);

    this.router.navigate(['/auth']); //to be changed to the home page ..
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

  //------------ Retrieve user's data from local storage if he was authenticated
  retrieveUserData() {
    const userDataString = localStorage.getItem('userData');

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = userDataString ? JSON.parse(userDataString) : null;

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
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
  //------------ Authenticate user and save his data.
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const currentlyLoggedInUser = new User(
      email,
      userId,
      token,
      expirationDate
    );

    // publish the currently logged in user
    this.user.next(currentlyLoggedInUser);

    // call autoLogout method to logout the user when his token expires.
    this.autoLogout(expiresIn * 1000);

    // Save the currently logged in user data, in order not to losing them when reloading.
    localStorage.setItem('userData', JSON.stringify(currentlyLoggedInUser));
  }

  //------------ Display a meaningful error messages for the user when signup/login.
  private handleError(e: HttpErrorResponse) {
    let errorMessage = 'An error occured. Please try again.';

    // when network is lost..
    if (!e.error || !e.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (e.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Incorrect email or password. Please try again.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts. Please try again later.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
