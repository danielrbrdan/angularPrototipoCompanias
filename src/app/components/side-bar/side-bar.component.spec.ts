import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SideBarComponent } from './side-bar.component';
import { ConfirmationDialogService } from '../dialogs/confirmation-dialog/confirmation-dialog.service';
import { of } from 'rxjs';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let confirmationDialogServiceMock: jasmine.SpyObj<ConfirmationDialogService>;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    confirmationDialogServiceMock = jasmine.createSpyObj(
      'ConfirmationDialogService',
      ['confirm']
    );

    confirmationDialogServiceMock.confirm.and.returnValue(
      Promise.resolve(true)
    );

    await TestBed.configureTestingModule({
      imports: [SideBarComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: ConfirmationDialogService,
          useValue: confirmationDialogServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate when moveToPage is called', () => {
    const url = '/test-url';
    component.moveToPage(url);

    expect(routerMock.navigate).toHaveBeenCalledWith([url]);
  });

  it('should call confirmationDialogService.confirm and router.navigate when logout is called and confirmed', async () => {
    const confirmSpy = confirmationDialogServiceMock.confirm.and.returnValue(
      Promise.resolve(true)
    );
    const url = '/logout';
    await component.logout();

    expect(confirmSpy).toHaveBeenCalledWith(
      'Sair do sistema?',
      'Realmente deseja sair do sistema?'
    );
    expect(routerMock.navigate).toHaveBeenCalledWith([url]);
  });

  it('should not navigate if logout is canceled', async () => {
    const confirmSpy = confirmationDialogServiceMock.confirm.and.returnValue(
      Promise.resolve(false)
    );
    await component.logout();

    expect(confirmSpy).toHaveBeenCalledWith(
      'Sair do sistema?',
      'Realmente deseja sair do sistema?'
    );
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
