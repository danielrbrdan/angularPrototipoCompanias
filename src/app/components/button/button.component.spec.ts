import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the button component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when clicked', () => {
    spyOn(component.onClick, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should pass the correct event on click', () => {
    spyOn(component.onClick, 'emit');
    const event = new MouseEvent('click');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', event);
    expect(component.onClick.emit).toHaveBeenCalledWith(event);
  });

  it('should set the correct class based on input', () => {
    component.class = 'btn-success';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('btn-success');
  });

  it('should default to "btn-primary" class when no input is given', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('btn-primary');
  });
});
