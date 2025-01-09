import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyComponent } from './company.component';
import { CompanyService } from './service/company.service';
import { ICompany } from './interface/company.interface';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { ColumnComponent } from '../../components/table/column/column.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

class MockCompanyService {
  findAll() {
    return of([]);
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

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        TableComponent,
        ColumnComponent,
        CompanyComponent,
      ],
      providers: [
        { provide: CompanyService, useClass: MockCompanyService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAll method on ngOnInit', () => {
    spyOn(companyService, 'findAll').and.callThrough();
    component.ngOnInit();
    expect(companyService.findAll).toHaveBeenCalled();
  });

  it('should populate rows with data', () => {
    const mockData: ICompany[] = [
      { id: 1, name: 'Company 1', cnpj: '12345678000195' } as ICompany,
    ];
    spyOn(companyService, 'findAll').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.rows).toEqual(mockData);
  });
});
