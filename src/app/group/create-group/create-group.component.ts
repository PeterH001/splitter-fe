import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  createGroupForm = new FormGroup({
    groupName: new FormControl('', Validators.required),
    userIds: new FormControl<number[]>([]),
    simplify: new FormControl<boolean>(false, Validators.required),
  });
  users!: { id: number; username: string }[];
  selectedUsers: number[] = [];
  isCollapsed: boolean = true;
  constructor(
    private location: Location,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
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
    });
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
  }

  isChecked(id: number) {
    return this.selectedUsers.find((userId) => userId === id) ? true : false;
  }

  get userIds() {
    return this.createGroupForm.get('userIds');
  }

  get groupName() {
    return this.createGroupForm.get('groupName');
  }

  get simplify() {
    return this.createGroupForm.get('simplify');
  }
}
