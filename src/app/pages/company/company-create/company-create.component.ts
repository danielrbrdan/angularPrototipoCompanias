import { Component, Injector } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICompany } from '../interface/company.interface';
import { CompanyService } from '../service/company.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { BaseComponent } from '../../../utils/component/base.component';
import { cepRegex, cnpjRegex } from '../../../utils/variables/common-variables';

@Component({
  selector: 'app-company-create',
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.scss',
})
export class CompanyCreateComponent extends BaseComponent<ICompany> {
  constructor(
    private readonly formBuilder: FormBuilder,
    protected injector: Injector,
    private readonly companyService: CompanyService
  ) {
    super(injector, companyService);
  }

  override ngOnInit() {
    this.setForm();
    super.ngOnInit();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      cnpj: [null, [Validators.required, Validators.pattern(cnpjRegex)]],
      endereco: this.formBuilder.group({
        logradouro: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required, Validators.pattern(cepRegex)]],
      }),
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }
}
