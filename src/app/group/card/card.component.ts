import { Component, Input } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() id!: number;
  @Input() debtsByCurrencies!:{amount: number, currency: string}[]
  @Input() groupName!: string;

  constructor(private groupService: GroupService, private router: Router) {}
  navigateToGroupDetails(id: number) {
    this.router.navigate(['/groupdetails', id]);
  }
}
