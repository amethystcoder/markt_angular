import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  signupForm = this.formBuilder.group(
    {
      accountType: ['buyer', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: confirmPasswordValidator() }
  );

  get accountType(): AbstractControl {
    return this.signupForm.controls['accountType'];
  }

  get name(): AbstractControl {
    return this.signupForm.controls['name'];
  }

  get password(): AbstractControl {
    return this.signupForm.controls['password'];
  }

  get confirmPassword(): AbstractControl {
    return this.signupForm.controls['confirmPassword'];
  }

  onCreateAccount() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      console.log(this.signupForm);
    }
  }
}
