import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: HTMLInputElement;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    control = new FormControl('', []);
    component.control = control;
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create the input component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input value to control value', () => {
    control.setValue('test value');
    fixture.detectChanges();
    expect(inputElement.value).toBe('test value');
  });

  it('should call onChange when input value changes', () => {
    spyOn(component, 'onChange');
    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.onChange).toHaveBeenCalledWith('new value');
  });

  it('should emit inputChange event when value changes', () => {
    spyOn(component.inputChange, 'emit');
    inputElement.value = 'changed value';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.inputChange.emit).toHaveBeenCalledWith('changed value');
  });

  it('should call registerOnChange and registerOnTouched', () => {
    const onChangeFn = jasmine.createSpy();
    const onTouchedFn = jasmine.createSpy();
    
    component.registerOnChange(onChangeFn);
    component.registerOnTouched(onTouchedFn);

    component.onChange('new value');
    component.onTouched();

    expect(onChangeFn).toHaveBeenCalledWith('new value');
    expect(onTouchedFn).toHaveBeenCalled();
  });

  it('should return error messages when control has errors', () => {
    control.setErrors({ required: true });
    fixture.detectChanges();
    const errors = component.getErrors();
    expect(errors).toContain('Campo é obrigatório');
  });

  it('should return empty array if no errors', () => {
    control.setErrors(null);
    fixture.detectChanges();
    const errors = component.getErrors();
    expect(errors.length).toBe(0);
  });

  it('should correctly bind label and placeholder inputs', () => {
    component.label = 'Username';
    component.placeholder = 'Enter your username';
    fixture.detectChanges();

    expect(inputElement.placeholder).toBe('Enter your username');
  });
});
