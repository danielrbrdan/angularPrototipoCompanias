import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class notAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
