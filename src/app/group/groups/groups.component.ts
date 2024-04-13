import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';
import { GetMyGroupsDTO } from '../dto';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groups: GetMyGroupsDTO[] = [];
  groupBalances: { amount: number; currency: string }[][] = [];

  constructor(
    private groupService: GroupService,
    private balanceService: BalanceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.groupService.getMyGroups().subscribe((response) => {
      this.groups = response;

      const groupIds: number[] = this.groups.map((group) => group.groupId);
      this.balanceService.yourGroupBalances(groupIds).subscribe((response) => {
        this.groupBalances = response;
        console.log(this.groupBalances);
        
      });
    });
  }
  createGroup() {
    this.router.navigate(['/creategroup']);
  }
}
