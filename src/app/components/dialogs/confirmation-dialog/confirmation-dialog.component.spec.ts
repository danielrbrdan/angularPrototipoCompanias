import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { of } from 'rxjs';

class MockNgbActiveModal {
  close(result: any) {}
  dismiss() {}
}
class MockConfirmationDialogService {
  confirm() {
    return of(true);
  }
}

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let mockActiveModal: MockNgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
        {
          provide: ConfirmationDialogService,
          useClass: MockConfirmationDialogService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal with "true" when accept is called', () => {
    spyOn(mockActiveModal, 'close');
    component.accept();
    expect(mockActiveModal.close).toHaveBeenCalledWith(true);
  });

  it('should close the modal with "false" when decline is called', () => {
    spyOn(mockActiveModal, 'close');
    component.decline();
    expect(mockActiveModal.close).toHaveBeenCalledWith(false);
  });

  it('should dismiss the modal when dismiss is called', () => {
    spyOn(mockActiveModal, 'dismiss');
    component.dismiss();
    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  });

  it('should have the correct inputs bound to component properties', () => {
    component.title = 'Confirmation';
    component.message = 'Are you sure you want to proceed?';
    component.btnOkText = 'Yes';
    component.btnCancelText = 'No';

    expect(component.title).toBe('Confirmation');
    expect(component.message).toBe('Are you sure you want to proceed?');
    expect(component.btnOkText).toBe('Yes');
    expect(component.btnCancelText).toBe('No');
  });
});
