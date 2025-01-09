import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ConfirmationDialogService } from '../dialogs/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(
    public readonly router: Router,
    private readonly confirmationDialogService: ConfirmationDialogService
  ) {}

  logout() {
    this.confirmationDialogService
      .confirm('Sair do sistema?', 'Realmente deseja sair do sistema?')
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.moveToPage('/logout');
      });
  }

  moveToPage(url: string) {
    this.router.navigate([url]);
  }
}
