import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ConfirmationDialogService } from '../../components/dialogs/confirmation-dialog/confirmation-dialog.service';
import { BaseComponent } from './base.component';
import { FormBuilder } from '@angular/forms';

describe('BaseComponent', () => {
  let component: BaseComponent<any>;
  let router: Router;
  let toastrService: ToastrService;
  let confirmationDialogService: ConfirmationDialogService;
  let baseService: any;

  beforeEach(() => {
    baseService = {
      findById: jasmine
        .createSpy('findById')
        .and.returnValue(of({ id: 1, name: 'Test' })),
      findAll: jasmine.createSpy('findAll').and.returnValue(of([])),
      create: jasmine.createSpy('create').and.returnValue(of({ id: 1 })),
      update: jasmine.createSpy('update').and.returnValue(of({})),
      deleteById: jasmine.createSpy('deleteById').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            url: String('/test-url-component'),
          },
        },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Location, useValue: {} },
        {
          provide: ToastrService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
        {
          provide: ConfirmationDialogService,
          useValue: {
            confirm: jasmine
              .createSpy('confirm')
              .and.returnValue(Promise.resolve(true)),
          },
        },
        {
          provide: Injector,
          useValue: { get: (token: any) => TestBed.inject(token) },
        },
        { provide: 'BaseService', useValue: baseService },
      ],
    });

    const injector = TestBed.inject(Injector);
    router = TestBed.inject(Router);
    toastrService = TestBed.inject(ToastrService);
    confirmationDialogService = TestBed.inject(ConfirmationDialogService);

    component = new BaseComponent<any>(injector, baseService);
    component.form = new FormBuilder().group({});
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call findById and populate form on loadData', () => {
    component.idEdit = 1;
    spyOn(component.form, 'patchValue');

    component.loadData();

    expect(baseService.findById).toHaveBeenCalledWith(1);
    expect(component.data).toEqual({ id: 1, name: 'Test' });
    expect(component.form.patchValue).toHaveBeenCalledWith({
      id: 1,
      name: 'Test',
    });
  });

  it('should navigate to the create page on moveToCreatePage', () => {
    component.moveToCreatePage();
    expect(router.navigate).toHaveBeenCalledWith(['create'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('should navigate to the edit page on moveToEdit', () => {
    component.moveToEdit(1);
    expect(router.navigate).toHaveBeenCalledWith(['test-url-component/edit/1']);
  });

  it('should delete a record on deleteById', async () => {
    spyOn(component, 'findAll');
    await component.deleteById(1);

    expect(confirmationDialogService.confirm).toHaveBeenCalledWith(
      'Deletando registro',
      'Deseja realmente deletar o registro?',
    );
    expect(baseService.deleteById).toHaveBeenCalledWith(1);
    expect(component.findAll).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Deletado com sucesso!');
  });

  it('should handle form submission for create', () => {
    spyOn(component, 'getFormValue').and.returnValue({ id: null });
    spyOn(component, 'create');

    component.onSubmit();

    expect(component.getFormValue).toHaveBeenCalled();
    expect(component.create).toHaveBeenCalledWith({ id: null });
  });

  it('should handle form submission for update', () => {
    component.idEdit = 1;
    spyOn(component, 'getFormValue').and.returnValue({ id: 1 });
    spyOn(component, 'update');

    component.onSubmit();

    expect(component.getFormValue).toHaveBeenCalled();
    expect(component.update).toHaveBeenCalledWith({ id: 1 });
  });
});
