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
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  step: 'LOGIN' | 'REGISTER' = 'LOGIN';
  formLogin!: FormGroup;
  formRegister!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService
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
    this.authService.login(user).subscribe({
      next: (response) => {},
      error: (err) => {
        this.toastrService.error('Usuário ou senha invalidos');
      },
    });
  }

  register() {
    if (this.formRegister.invalid) return;
    const user = this.formRegister.getRawValue() as IUser;
    this.authService.create(user).subscribe({
      next: () => {
        this.formRegister.reset();
        this.toastrService.success('Usuário cadastrado com sucesso!');
        this.step = 'LOGIN'
      },
      error: (err) => {
        this.toastrService.error(
          'Erro ao cadastrar o usuário. Tente novamente.'
        );
      },
    });
  }

  isLogin() {
    return this.step == 'LOGIN';
  }

  isRegister() {
    return this.step == 'REGISTER';
  }
}
