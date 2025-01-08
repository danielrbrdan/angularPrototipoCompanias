import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  NgForm,
  NgControl,
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = this.label;
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() control!: AbstractControl<any, any> | null;

  @Output() inputChange = new EventEmitter<string>();

  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
    this.inputChange.emit(input.value);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  getErrors(): string[] {
    const errors: string[] = [];

    const errorMessagesMap = [
      { key: 'required', message: 'Campo é obrigatório' },
      {
        key: 'minlength',
        message: `Este campo deve ter pelo menos {{minLength}} caracteres.`,
      },
      {
        key: 'maxlength',
        message: `Este campo não deve ter mais de {{maxLength}} caracteres.`,
      },
      { key: 'pattern', message: 'O formato de entrada está incorreto.' },
      {
        key: 'email',
        message: 'Por favor, insira um endereço de e-mail válido.',
      },
      {
        key: 'min',
        message: `Este campo deve ter um valor maior ou igual a {{min}}.`,
      },
      {
        key: 'max',
        message: `Este campo deve ter um valor menor ou igual a {{max}}.`,
      },
    ];

    errorMessagesMap.forEach((errorMessage) => {
      if (this.control?.errors?.[errorMessage.key]) {
        errors.push(errorMessage.message);
      }
    });

    return errors;
  }

  toControl(absCtrl: AbstractControl<any, any> | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
