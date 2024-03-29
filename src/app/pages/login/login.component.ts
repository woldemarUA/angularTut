import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  restorePassword: FormGroup;
  isLogin: boolean = false;
  isPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  async login() {
    try {
      const response = await this.authService.login(
        this.authForm.value.email,
        this.authForm.value.password
      );
      if (!response) console.log('Login failed');
      this.router.navigate(['/home/profile']);
      this.toastService.showSuccess('Vous etez connecté avec success');
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      if (err.code === 'auth/invalid-credential')
        return this.toastService.showFailrue(
          " mot de passe ou nom d'utilisateur erroné"
        );
      this.toastService.showFailrue(errorMessage);
    }
  }
  async loginWithGoogle() {
    try {
      this.authService.loginWithGoogle().then((response) => {
        if (!response) console.log('Login with gooogle failed');
        this.router.navigate(['home/profile']);
        this.toastService.showSuccess('Vous etez connecté avec success');
      });
    } catch (err) {
      this.toastService.showFailrue(err);
    }
  }

  async register() {
    try {
      await this.authService.register(
        this.authForm.value.email,
        this.authForm.value.password
      );
      this.toastService.showSuccess(
        'Vous etez registré avec success. Vous pouvez vous connecter'
      );
      this.router.navigate(['/auth/login']);
    } catch (err) {
      this.toastService.showFailrue(err);
    }
  }

  async passwordReset() {
    try {
      const email = this.restorePassword.get('resendPassword').value;
      await this.authService.resetPassword(email);

      this.toastService.showSuccess(
        'Si un compte avec cette adresse e-mail existe, un lien de réinitialisation du mot de passe a été envoyé.'
      );
      this.isPassword = false;
    } catch (err) {
      console.error(err);
      this.toastService.showFailrue('Erreur');
    }
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((url) => {
      const path = url[0].path;
      if (path === 'login') this.isLogin = true;
    });
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.restorePassword = this.formBuilder.group({
      resendPassword: ['', [Validators.required, Validators.email]],
    });
  }
}
