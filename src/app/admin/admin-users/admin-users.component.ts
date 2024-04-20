import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { AdminGetUsersDTO } from 'src/app/user/dto';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit{
  users!: AdminGetUsersDTO[];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe(response=>{
      this.users = response;
      console.log("users: ", this.users);
    })
  }
}
