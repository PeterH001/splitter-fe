import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  createGroupForm = new FormGroup({
    groupName: new FormControl('', Validators.required),
    userIds: new FormControl<number[]>([]),
  });
  users!: { id: number; username: string }[];
  selectedUsers: number[] = [];
  isCollapsed: boolean = true; 
  constructor(
    private location: Location,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result) => {
      console.log('result: ', result);
      this.users = result;
    });
  }
  submitForm(): void {
    console.log('Form data:', this.createGroupForm.value);
    this.groupService.createGroup(this.createGroupForm.value).subscribe(() => {
      this.router.navigate(['/groups']);
    },
    (error)=>{
    }
    );
    // Add your form submission logic here
  }
  goBack() {
    this.location.back();
  }

  toggleSelection(userId: number) {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter((item) => item !== userId);
    } else {
      this.selectedUsers.push(userId);
    }
    this.createGroupForm.get('userIds')?.setValue(this.selectedUsers);
    console.log("selectedUsers: ", this.selectedUsers);
    
  }

  isChecked(id: number){
   return  this.selectedUsers.find(userId=> userId === id) ? true : false;
  }

  get userIds() {
    return this.createGroupForm.get('userIds');
  }

  get groupName() {
    return this.createGroupForm.get('groupName');
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
