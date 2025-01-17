import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
