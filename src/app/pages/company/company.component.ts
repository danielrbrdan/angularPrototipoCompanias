import { Component, Injector, OnInit } from '@angular/core';
import { CompanyService } from './service/company.service';
import { ICompany } from './interface/company.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { ColumnComponent } from '../../components/table/column/column.component';
import { TableComponent } from '../../components/table/table.component';
import { BaseComponent } from '../../utils/component/base.component';
@Component({
  selector: 'app-company',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TableComponent,
    ColumnComponent,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent extends BaseComponent<ICompany> implements OnInit {
  constructor(
    protected injector: Injector,
    protected readonly companyService: CompanyService,
  ) {
    super(injector, companyService);
  }

  override ngOnInit(): void {
    this.findAll();
  }
}
