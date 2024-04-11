import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserRole } from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  admin: string = UserRole.ADMIN;
  user: string = UserRole.USER;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.isLoggedin();
    console.log('isloggedin:', this.isLoggedin());
  }

  isHomeScreen(): boolean {
    return this.router.url === '/home';
  }
  isLoggedin() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.clear();
    if (!this.isLoggedin()) {
      this.router.navigate(['/home']);
    }
  }

  roleMatch(role: string[]) {
    return this.userService.roleMatch(role);
  }

  navigateAdminUsers() {
    this.router.navigate(['/admin/users']);
  }
  
  navigateAdminGroups() {
    this.router.navigate(['/admin/groups']);
  }
}
