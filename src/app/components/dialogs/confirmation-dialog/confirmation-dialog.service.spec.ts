import { TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

class MockNgbModal {
  open() {
    return {
      componentInstance: {},
      result: Promise.resolve(true),
    } as NgbModalRef;
  }
}

describe('ConfirmationDialogService', () => {
  let service: ConfirmationDialogService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfirmationDialogService,
        { provide: NgbModal, useClass: MockNgbModal },
      ],
    });

    service = TestBed.inject(ConfirmationDialogService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the modal with the correct parameters', async () => {
    const spy = spyOn(modalService, 'open').and.callThrough();

    const title = 'Test Title';
    const message = 'Test Message';
    const btnOkText = 'Confirm';
    const btnCancelText = 'Cancel';
    const dialogSize = 'lg';

    await service.confirm(title, message, btnOkText, btnCancelText, dialogSize);

    expect(spy).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      size: dialogSize,
    });

    const modalRef = spy.calls.mostRecent().returnValue as NgbModalRef;
    expect(modalRef.componentInstance.title).toBe(title);
    expect(modalRef.componentInstance.message).toBe(message);
    expect(modalRef.componentInstance.btnOkText).toBe(btnOkText);
    expect(modalRef.componentInstance.btnCancelText).toBe(btnCancelText);
  });

  it('should resolve to true when modal result is true', async () => {
    spyOn(modalService, 'open').and.returnValue({
      componentInstance: {},
      result: Promise.resolve(true),
    } as NgbModalRef);

    const result = await service.confirm('Title', 'Message');
    expect(result).toBeTrue();
  });

  it('should resolve to false when modal result is false', async () => {
    spyOn(modalService, 'open').and.returnValue({
      componentInstance: {},
      result: Promise.resolve(false),
    } as NgbModalRef);

    const result = await service.confirm('Title', 'Message');
    expect(result).toBeFalse();
  });

  it('should reject the promise when modal is dismissed', async () => {
    spyOn(modalService, 'open').and.returnValue({
      componentInstance: {},
      result: Promise.reject('dismissed'),
    } as NgbModalRef);

    await expectAsync(
      service.confirm('Title', 'Message')
    ).toBeRejectedWith('dismissed');
  });
});
