import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGetGroupDTO } from 'src/app/group/dto';
import { GroupDTO } from 'src/app/group/dto/group.dto';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {
  groups!: AdminGetGroupDTO[];

  constructor(private groupService: GroupService, private router: Router){}
  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(response=>{
      this.groups = response;
      console.log(this.groups);
      
    })
  }

  navigateToGroup(groupId: number) {
    this.router.navigate(['/groupdetails', groupId]);
    }

}
