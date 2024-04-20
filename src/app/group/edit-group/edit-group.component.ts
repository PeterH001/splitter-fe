import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { GroupDTO } from '../dto/group.dto';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminGetUsersDTO as GetUsersDTO } from 'src/app/user/dto';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css'],
})
export class EditGroupComponent implements OnInit {
  id!: number;
  isCollapsed = true;
  groupDetails!: GroupDTO;
  editGroupForm = new FormGroup({
    groupName: new FormControl('', Validators.required),
    userIds: new FormControl<number[]>([]),
  });
  users!: GetUsersDTO[];
  selectedUsers: number[] = [];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('id: ', this.id);
    this.groupService.getGroupById(this.id).subscribe((response) => {
      this.groupDetails = response;
      console.log(this.groupDetails.name);
      this.editGroupForm.get('groupName')?.setValue(this.groupDetails.name);
      const userIds = this.groupDetails.members.map((member) => member.id);
      this.editGroupForm.get('userIds')?.setValue(userIds);
      console.log(this.editGroupForm.get('userIds')?.value);
      this.userService.getUsers().subscribe((response) => {
        this.users = response;
        console.log(this.users);
        this.users = this.users.filter(
          (user) =>
            !this.groupDetails.members.some((member) => member.id === user.id)
        );
        console.log(this.users);
      });
    });
  }

  toggleSelection(userId: number) {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter((item) => item !== userId);
    } else {
      this.selectedUsers.push(userId);
    }
    this.editGroupForm.get('userIds')?.setValue(this.selectedUsers);
    console.log('selectedUsers: ', this.selectedUsers);
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  isChecked(id: number) {
    return !!this.selectedUsers.find((userId) => userId === id);
  }
  submitForm() {
    console.log(this.editGroupForm.value);
    this.groupService
      .updateGroupById(this.groupDetails.id, this.editGroupForm.value)
      .subscribe(() => {
        this.router.navigate(['/groups']);
      });
  }

  deleteGroup() {
    this.groupService.deleteGroupById(this.groupDetails.id).subscribe(() => {
      this.router.navigate(['/groups']);
    });
  }
  goBack() {
    this.location.back();
  }
  get groupName() {
    return this.editGroupForm.get('groupName');
  }
}
