import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
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
      errorMessage: 'Missing password!',
    },
  ];

  constructor(private registrationService: RegistrationService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // this.registrationService.signIn(email, password);
    } else {
      this.isLoading = true;
      this.registrationService.signUp(email, password).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.isLoading = false;
        },
        error: (e) => {
          this.errorMessage = e.message;
          this.isLoading = false;
        },
      });
    }

    form.reset();
  }

  switchButtons() {
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
  }
}
