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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.authService.login(this.loginForm.value).subscribe(
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
        if (error.status === 403 || error.status === 400) {
          this.loginForm.get('email')?.setErrors({ badCredentials: true });
        }
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
}
