import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const roles = inject(AuthService).getRoles();
  console.log(roles);
  
  if (roles.includes('admin')) {
    return true;
  } else {
    inject(Router).navigate(['/error/forbidden']);
    return false;
  }
};
