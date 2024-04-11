import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../user/dto';

const BASEURL = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  patchUser(userData: Partial<{ username: string | null; email: string | null; firstName: string | null; lastName: string | null; }>) {
    return this.http.patch(BASEURL + '/me', userData);
  }
  constructor(private authservice: AuthService, private http: HttpClient) {}

  public roleMatch(allowedRoles: string[]): boolean {
    let isRoleMatching = false;
    const userRoles: string[] = this.authservice.getRoles();
    if (userRoles != null && userRoles) {
      return allowedRoles.some((role) => userRoles.includes(role));
    }
    return isRoleMatching;
  }

  public searchUser(partialUsername: string) {
    return this.http.post(BASEURL + '/find', { partialUsername });
  }

  public getUsers() {
    return this.http.get<{ id: number; username: string }[]>(BASEURL);
  }

  public getMe() {
    return this.http.get<UserDTO>(BASEURL + '/me');
  }
}
