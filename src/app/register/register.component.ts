import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

const ROLE_ADMIN: string = 'admin';
const ROLE_USER: string = 'user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      passwordValidator(),
      minLengthValidator(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    console.log('form value: ', this.registerForm.value);
    console.log(this.password?.errors);
    this.authService.register(this.registerForm.value).subscribe(
      (response: any)=>{
        const token = response.token;
        const role = response.role;
        this.authService.setToken(response.token);
        this.authService.setRoles(response.role);
        if (role === ROLE_ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error)=>{
        if(error.status === 400){
          if (error.error.message === 'Email is already taken') {
            this.registerForm.get('email')?.setErrors({ emailTaken: true });
          } else if (error.error.message === 'Username is already taken') {
            this.registerForm.get('username')?.setErrors({ usernameTaken: true });
          }
          else{
            throw error;
          }
        }
      }
    )
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const capitalRegex = /[A-Z]/;
    if (!capitalRegex.test(value)) {
      return { capital: true };
    }

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(value)) {
      return { number: true };
    }

    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharRegex.test(value)) {
      return { specialChar: true };
    }

    return null;
  };
}

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value || value.length < minLength) {
      return {
        minLength: {
          requiredLength: minLength,
          actualLength: value ? value.length : 0,
        },
      };
    }

    return null;
  };
}
