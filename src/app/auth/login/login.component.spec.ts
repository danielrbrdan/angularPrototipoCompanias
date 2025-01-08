import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { CardComponent } from '../../components/card/card.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
        CardComponent,
      ],
      providers: [FormBuilder, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the forms', () => {
    expect(component.formLogin).toBeTruthy();
    expect(component.formRegister).toBeTruthy();
    expect(component.formLogin.controls['username']).toBeTruthy();
    expect(component.formLogin.controls['password']).toBeTruthy();
  });

  it('should call login on AuthService when form is valid', () => {
    spyOn(authService, 'login').and.callThrough();

    component.formLogin.controls['username'].setValue('testuser');
    component.formLogin.controls['password'].setValue('password123');

    component.login();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });

  it('should not call login on AuthService when form is invalid', () => {
    spyOn(authService, 'login');

    component.formLogin.controls['username'].setValue('');
    component.formLogin.controls['password'].setValue('');

    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call register on AuthService when form is valid', () => {
    spyOn(authService, 'create').and.callThrough();

    component.formRegister.controls['username'].setValue('newuser');
    component.formRegister.controls['password'].setValue('newpassword');

    component.register();

    expect(authService.create).toHaveBeenCalledWith({
      username: 'newuser',
      password: 'newpassword',
    });
  });

  it('should not call register on AuthService when form is invalid', () => {
    spyOn(authService, 'create');

    component.formRegister.controls['username'].setValue('');
    component.formRegister.controls['password'].setValue('');

    component.register();

    expect(authService.create).not.toHaveBeenCalled();
  });
});
