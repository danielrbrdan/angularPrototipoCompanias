import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [ButtonComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}
}
