import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async login() {
    try {
      this.authService
        .login(this.authForm.value.email, this.authForm.value.password)
        .then((response) => {
          if (!response) console.log('Login failed');
          this.router.navigate(['/home/profile']);
        });
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  }
  async loginWithGoogle() {
    try {
      this.authService.loginWithGoogle().then((response) => {
        if (!response) console.log('Login with gooogle failed');
        this.router.navigate(['home/profile']);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async register() {
    try {
      this.authService
        .register(this.authForm.value.email, this.authForm.value.password)
        .then((result) => {
          console.log(result);
        });
    } catch (err) {
      console.error(err);
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
  }
}
