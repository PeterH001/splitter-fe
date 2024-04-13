import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { minLengthValidator, passwordValidator } from '../auth/validators';

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
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        (response: any)=>{
          this.authService.setToken(response.token);
          this.authService.setRoles(response.role);
          this.router.navigate(['/user']);
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