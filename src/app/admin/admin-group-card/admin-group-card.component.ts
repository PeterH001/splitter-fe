import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-admin-group-card',
  templateUrl: './admin-group-card.component.html',
  styleUrls: ['./admin-group-card.component.css'],
})
export class AdminGroupCardComponent {
  @Input() id!: number;
  @Input() groupName!: string;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private modalService: NgbModal
  ) {}
  editGroup() {
    this.router.navigate(['/group', this.id, 'edit']);
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  deleteGroup() {
    this.groupService.deleteGroupById(this.id).subscribe();
  }
}
