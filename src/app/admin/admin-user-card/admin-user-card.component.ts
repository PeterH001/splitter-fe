import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-user-card',
  templateUrl: './admin-user-card.component.html',
  styleUrls: ['./admin-user-card.component.css'],
})
export class AdminUserCardComponent {
  @Input() id!: number;
  @Input() username!: string;
  constructor(private modalService: NgbModal, private router: Router){}
  editUser() {
    this.router.navigate(['/edituser', this.id]);
  }
  deleteUser() {
    throw new Error('Method not implemented.');
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }
}
