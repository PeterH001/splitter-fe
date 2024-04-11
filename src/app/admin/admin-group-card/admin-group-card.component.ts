import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-group-card',
  templateUrl: './admin-group-card.component.html',
  styleUrls: ['./admin-group-card.component.css']
})
export class AdminGroupCardComponent {
  @Input() id!: number;
  @Input() groupName!: string;
  constructor(private router: Router){}
  editGroup() {
  this.router.navigate(['/expense', this.id, 'edit'])
  }
}

