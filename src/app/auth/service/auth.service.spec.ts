import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../utils/service/localStorage.service';
import { IUser } from '../interface/user.interface';
import { LoginResponse } from '../interface/authResponse.interface';
import { ENVIRONMENT } from '../../../environment/environment';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let localStorageService: LocalStorageService;
  let router: any;

  const mockUser: IUser = {
    username: 'testuser',
    password: 'password123',
  };

  const mockLoginResponse: LoginResponse = {
    token: 'token123',
    expiresIn: 3600,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, LocalStorageService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store user data', () => {
    spyOn(localStorageService, 'setItem').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    service.login(mockUser).subscribe((response) => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        'user',
        btoa(JSON.stringify(mockUser)),
      );
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        'token',
        btoa(JSON.stringify(mockLoginResponse.token)),
      );
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        'expiresIn',
        btoa(JSON.stringify(mockLoginResponse.expiresIn)),
      );
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    const req = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('should create a new user', () => {
    spyOn(localStorageService, 'setItem').and.callThrough();

    service.create(mockUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/singup`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get logged user data', () => {
    const mockUserData = JSON.stringify(mockUser);
    spyOn(localStorageService, 'getItem').and.returnValue(btoa(mockUserData));

    const loggedUser = service.loggedUser;

    expect(loggedUser).toEqual(mockUser);
  });

  it('should logout and clear localStorage', () => {
    spyOn(localStorageService, 'clear').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    service.logout();

    expect(localStorageService.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return token if available', () => {
    spyOn(localStorageService, 'getItem').and.returnValue(
      btoa(JSON.stringify('token123')),
    );

    const token = service.token;

    expect(token).toBe('token123');
  });

  it('should return true if user is logged in', () => {
    spyOn(localStorageService, 'getItem').and.returnValue(btoa('token123'));

    const isLoggedIn = service.isLoggedIn;

    expect(isLoggedIn).toBeTrue();
  });

  it('should return false if user is not logged in', () => {
    spyOn(localStorageService, 'getItem').and.returnValue(null);

    const isLoggedIn = service.isLoggedIn;

    expect(isLoggedIn).toBeFalse();
  });
});
