import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { ToastContainerComponent } from './pages/toast-container/toast-container.component';
import { Observable, map } from 'rxjs';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // implements OnInit
  title = 'auth';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.isLoggedIn$ = this.authService.user$.pipe(map((user) => !!user));
  }

  async logout(): Promise<any> {
    try {
      await this.authService.logOut();
      this.router.navigate(['/']);
      this.toastService.showSuccess('Vous etez deconnecté avec success');
    } catch (err) {}
  }
  // ngOnInit(): void {
  //   this.authService.user$.subscribe((user) => {
  //     if (user) this.isAuth = true;
  //   });
  // }
}
