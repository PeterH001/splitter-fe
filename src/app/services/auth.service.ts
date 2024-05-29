import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:3000/auth';

  login(logindata: any) {
    return this.http.post(this.baseUrl + '/signin', logindata);
  }
  
  logout(){
    this.clear();
  }

  register(registerData: any){
    return this.http.post(this.baseUrl + '/signup', registerData);
  }
  registerAdmin(registerData: any){
    return this.http.post(this.baseUrl + '/admin/signup', registerData);
  }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const rolesString = localStorage.getItem('roles');
    if (rolesString) {
        return JSON.parse(rolesString);
    } else {
        return [];
    }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    if(this.getRoles() && this.getToken()){      
      return true;
    }else{
      return false;
    }
  }
}
