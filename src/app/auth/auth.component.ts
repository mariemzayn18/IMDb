import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  title = 'Sign in';
  newOrHavingAccount = 'New to IMDb?';
  switchButtonText = 'Create your IMDb account';
  submitButtonText = 'Sign in';
  isLoginMode = true;
  isLoading = false;

  errorMessage: string = '';

  formFields = [
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      valid: false,
      touched: false,
      errorMessage: 'Please enter a valid email!',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      valid: false,
      touched: false,
      errorMessage: 'Password should be at least 6 characters!',
    },
  ];

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
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/movies/top-rated-movies-catalog']);
        this.resetForm(form);
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
