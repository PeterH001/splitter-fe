import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';
import { GetMyGroupsDTO } from '../dto';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groups: GetMyGroupsDTO[] = [];
  constructor(private groupService: GroupService, private router: Router) {}
  ngOnInit(): void {
    this.groupService.getMyGroups().subscribe((response) => {
      this.groups = response;
      console.log('groups: ', this.groups);
    });
  }
  createGroup() {
    this.router.navigate(['/creategroup']);
  }
}
