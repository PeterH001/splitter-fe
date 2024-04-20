import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from '../dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userData!: UserDTO;
  userId!: number

  userDataForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  constructor(private location: Location, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.userService
      .getUserById(this.userId)
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
    this.userService.patchUser(this.userId, this.userDataForm.value).subscribe(()=>{
      this.router.navigate(['/admin/users']);
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
