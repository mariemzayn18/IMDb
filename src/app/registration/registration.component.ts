import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  title = 'Sign in';
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
}
