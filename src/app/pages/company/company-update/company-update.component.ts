import { Component } from '@angular/core';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-update',
  imports: [CompanyCreateComponent],
  templateUrl: './company-update.component.html',
  styleUrl: './company-update.component.scss',
})
export class CompanyUpdateComponent {
  id?: number;

  constructor(protected activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')) || undefined;
    });
  }
}
