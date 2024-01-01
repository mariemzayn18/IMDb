import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  title = 'Sign in';
  newOrHavingAccount = 'New to IMDb?';
  exchangeButtonText = 'Create your IMDb account';
  submitButtonText = 'Sign in';

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

  onSubmit(form: NgForm) {
    console.log(form);
  }

  exchangeButtons() {
    this.title = this.title === 'Sign in' ? 'Create account' : 'Sign in';
    this.newOrHavingAccount =
      this.newOrHavingAccount === 'New to IMDb?'
        ? 'Already have an account?'
        : 'New to IMDb?';
    this.exchangeButtonText =
      this.exchangeButtonText === 'Create your IMDb account'
        ? 'Sign in'
        : 'Create your IMDb account';

    this.submitButtonText =
      this.submitButtonText === 'Sign in' ? 'Sign Up' : 'Sign in';
  }
}
