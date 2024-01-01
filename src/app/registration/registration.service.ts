import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

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
export class RegistrationService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {}

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
      .pipe(catchError(this.handleError));
  }

  private handleError(e: HttpErrorResponse) {
    let errorMessage = 'An error occured. Please try again.';

    if (!e.error || !e.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (e.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'This email is invalid.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

  logOut() {}
}
