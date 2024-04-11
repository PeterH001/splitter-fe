import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

const ROLE_ADMIN: string = 'admin';
const ROLE_USER: string = 'user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm2 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login(loginForm: NgForm) {
    console.log(loginForm.value);
    console.log('form is submitted');
    this.authService.login(loginForm.value).subscribe(
      (response: any) => {
        const token = response.token;
        const role = response.role;
        this.authService.setToken(response.token);
        this.authService.setRoles(response.role);
        if (role === ROLE_ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/groups']);
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  submitForm() {
    this.authService.login(this.loginForm2.value).subscribe(
      (response: any) => {
        const role = response.role;
        this.authService.setToken(response.token);
        this.authService.setRoles(response.role);
        if (role === ROLE_ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/groups']);
        }
      },
      (error) => {
        if (error.status === 403) {
          this.loginForm2.get('email')?.setErrors({ badCredentials: true });
        }
      }
    );
  }

  get email() {
    return this.loginForm2.get('email');
  }
}
