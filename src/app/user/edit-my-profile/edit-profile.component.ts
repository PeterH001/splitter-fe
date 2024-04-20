import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from '../dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditMyProfileComponent implements OnInit {
  userData!: UserDTO;

  userDataForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  constructor(private location: Location, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getMe()
      .subscribe((response) => {
        this.userData = response;
        this.userDataForm.get('username')?.setValue(this.userData.username);
        this.userDataForm.get('firstName')?.setValue(this.userData.firstName);
        this.userDataForm.get('lastName')?.setValue(this.userData.lastName);
        this.userDataForm.get('email')?.setValue(this.userData.email);
      });
  }

  submitForm() {
    console.log(this.userDataForm.value);
    this.userService.patchMe(this.userDataForm.value).subscribe(()=>{
      this.router.navigate(['/user']);
    },
    (error)=>{
      if(error.status === 400){
        if (error.error.message === 'Email is already in use.') {
          this.userDataForm.get('email')?.setErrors({ emailTaken: true });
        } else if (error.error.message === 'Username is already in use.') {
          this.userDataForm.get('username')?.setErrors({ usernameTaken: true });
        }
        else{
          throw error;
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  get username() {
    return this.userDataForm.get('username');
  }
  get email() {
    return this.userDataForm.get('email');
  }
  get firstName() {
    return this.userDataForm.get('firstName');
  }
  get lasName() {
    return this.userDataForm.get('lasName');
  }
}
