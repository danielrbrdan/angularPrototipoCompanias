import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyUpdateComponent } from './company-update.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

class MockToastrService {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('CompanyUpdateComponent', () => {
  let component: CompanyUpdateComponent;
  let fixture: ComponentFixture<CompanyUpdateComponent>;

  const activatedRouteMock = {
    paramMap: of({
      get: (key: string) => (key === 'id' ? '123' : null),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyUpdateComponent, CompanyCreateComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should extract the id from the route', () => {
    expect(component.id).toBe(123);
  });
});
