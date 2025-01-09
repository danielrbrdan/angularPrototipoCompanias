import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyCreateComponent } from './company-create.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CompanyService } from '../service/company.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

class MockCompanyService {
  create() {
    return of({});
  }
}

class MockActivatedRoute {
  snapshot = {
    params: { id: 1 },
  };
}

class MockToastrService {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('CompanyCreateComponent', () => {
  let component: CompanyCreateComponent;
  let fixture: ComponentFixture<CompanyCreateComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CompanyCreateComponent,
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
      ],
      providers: [
        FormBuilder,
        { provide: CompanyService, useClass: MockCompanyService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreateComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct structure', () => {
    const form = component.form;
    expect(form).toBeTruthy();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('cnpj')).toBeTrue();
    expect(form.contains('address')).toBeTrue();
    expect(form.contains('phone')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
  });

  it('should apply required validators to fields', () => {
    const form = component.form;

    const nameControl = form.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();

    const cnpjControl = form.get('cnpj');
    cnpjControl?.setValue('');
    expect(cnpjControl?.valid).toBeFalsy();

    const addressControl = form.get('address.street');
    addressControl?.setValue('');
    expect(addressControl?.valid).toBeFalsy();
  });

  it('should call the companyService create method when form is valid', () => {
    spyOn(companyService, 'create').and.callThrough();
    const form = component.form;
    form.get('name')?.setValue('Company Name');
    form.get('cnpj')?.setValue('12345678000195');
    form.get('address.street')?.setValue('Street');
    form.get('address.numero')?.setValue('123');
    form.get('address.neighborhood')?.setValue('Bairro');
    form.get('address.city')?.setValue('City');
    form.get('address.state')?.setValue('State');
    form.get('address.zipCode')?.setValue('12345678');
    form.get('phone')?.setValue('123456789');
    form.get('email')?.setValue('email@example.com');
    fixture.detectChanges();

    component.createOrUpdate();
    expect(companyService.create).toHaveBeenCalled();
  });
});
