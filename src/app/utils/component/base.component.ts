import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseService } from '../service/base.service';
import { FormGroup } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogService } from '../../components/dialogs/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-base',
  template: ``,
  imports: [BrowserAnimationsModule],
})
export class BaseComponent<T extends { id: number }> implements OnInit {
  @Input() idEdit?: number;

  protected router!: Router;
  protected activatedRoute!: ActivatedRoute;
  protected location!: Location;
  protected toastrService!: ToastrService;
  protected confirmationDialogService: ConfirmationDialogService;

  rows?: T[];
  form!: FormGroup;
  data?: T;

  constructor(
    protected readonly _injector: Injector,
    protected readonly service: BaseService<T>
  ) {
    this.router = this._injector.get(Router);
    this.activatedRoute = this._injector.get(ActivatedRoute);
    this.location = this._injector.get(Location);
    this.toastrService = this._injector.get(ToastrService);
    this.confirmationDialogService = this._injector.get(
      ConfirmationDialogService
    );
  }

  ngOnInit(): void {
    this.editActions();
  }

  editActions() {
    if (!this.idEdit) {
      return;
    }

    this.loadData();
  }

  loadData() {
    if (!this.idEdit) {
      return;
    }

    this.service.findById(this.idEdit).subscribe((data) => {
      this.data = data;
      this.form.patchValue(this.mapToLoadData(data));
    });
  }

  mapToLoadData(data: T): Object {
    return data;
  }

  get currentUrl() {
    return window.location.href;
  }

  protected moveToCreatePage() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  moveToEdit(id: number) {
    this.router.navigate([`${this.router.url.split('/')[1]}/edit/${id}`]);
  }

  protected moveToPreviousPage() {
    this.router.navigate([`${this.router.url.split('/')[1]}`]);
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.rows = response;
    });
  }

  onSubmit(): void {
    this.createOrUpdate();
  }

  isFormValid() {
    return !this.form.invalid;
  }

  createOrUpdate() {
    this.touchAllControls();
    if (!this.isFormValid()) return;
    const value = this.getFormValue();

    if (this.idEdit) {
      this.update(value);
    } else {
      this.create(value);
    }
  }

  touchAllControls() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.markAsDirty();
      }
    });
  }

  update(value: T) {
    this.service.update(value).subscribe({
      next: (result) => {
        this.editActions();
        this.sendToastrSucessMessage(['Atualizado com sucesso!']);
      },
      error: (error) => {
        this.sendToastrErrorMessage(error);
      },
    });
  }

  getFormValue() {
    return this.form.getRawValue() as T;
  }

  create(value: T) {
    this.service.create(value).subscribe({
      next: (result) => {
        this.form.reset();
        this.moveToEdit(result.id);
        this.sendToastrSucessMessage(['Criado com sucesso!']);
      },
      error: (error) => {
        this.sendToastrErrorMessage(error);
      },
    });
  }

  deleteById(id: number) {
    this.confirmationDialogService
      .confirm('Deletando registro', 'Deseja realmente deletar o registro?')
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }
        
        this.service.deleteById(id).subscribe({
          next: (result) => {
            this.findAll();
            this.sendToastrSucessMessage(['Deletado com sucesso!']);
          },
          error: (error) => {
            this.sendToastrErrorMessage(error);
          },
        });
      });
  }

  sendToastrErrorMessage(error: string[]) {
    error?.forEach((err) => {
      this.toastrService.error(err);
    });
  }

  sendToastrSucessMessage(message: string[]) {
    message?.forEach((message) => {
      this.toastrService.success(message);
    });
  }
}
