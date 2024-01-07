import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { AuthResponseData } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // For switching between sign in and sign up
  title = 'Sign in';
  newOrHavingAccount = 'New to IMDb?';
  switchButtonText = 'Create your IMDb account';
  submitButtonText = 'Sign in';
  isLoginMode = true;

  isLoading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetForm(form: NgForm) {
    form.reset();
    this.errorMessage = '';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/movies/top-movies-catalog']);
      },
      error: (e) => {
        this.errorMessage = e.message;
        this.isLoading = false;
      },
    });
  }

  switchButtons(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    this.title = this.title === 'Sign in' ? 'Create account' : 'Sign in';
    this.submitButtonText =
      this.submitButtonText === 'Sign in' ? 'Sign Up' : 'Sign in';
    this.newOrHavingAccount =
      this.newOrHavingAccount === 'New to IMDb?'
        ? 'Already have an account?'
        : 'New to IMDb?';
    this.switchButtonText =
      this.switchButtonText === 'Create your IMDb account'
        ? 'Sign in'
        : 'Create your IMDb account';

    this.resetForm(form);
  }
}
