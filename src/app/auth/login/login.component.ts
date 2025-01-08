import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../interface/user.interface';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  formRegister!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    const formGorup = {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    };
    this.formLogin = this.formBuilder.group(formGorup);
    this.formRegister = this.formBuilder.group(formGorup);
  }

  login() {
    if (this.formLogin.invalid) return;
    const user = this.formLogin.getRawValue() as IUser;
    this.authService.login(user).subscribe();
  }

  register() {
    if (this.formRegister.invalid) return;
    const user = this.formRegister.getRawValue() as IUser;
    this.authService.create(user).subscribe();
  }
}
