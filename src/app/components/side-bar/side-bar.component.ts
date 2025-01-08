import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-side-bar',
  imports: [ButtonComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(public readonly router: Router){};

  moveToPage(url: string) {
    this.router.navigate([url]);
  }
}
