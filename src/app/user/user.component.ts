import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDTO } from './dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userData!: UserDTO;
  
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.getMe().subscribe((response) => this.userData = response);
  }

  navigate(){
    this.router.navigate(['/edituser']);
  }
}
