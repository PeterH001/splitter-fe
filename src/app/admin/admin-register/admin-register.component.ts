import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minLengthValidator, passwordValidator } from 'src/app/auth/validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
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
      this.authService.registerAdmin(this.registerForm.value).subscribe(
        (response: any)=>{
          this.authService.setToken(response.token);
          this.authService.setRoles(response.role);
          this.router.navigate(['/admin']);
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
