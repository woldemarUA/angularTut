import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';

export const canActivateAuth: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    take(1),
    map((user) => {
      return !!user;
    })
  );
};
