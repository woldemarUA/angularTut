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
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // implements OnInit
  title = 'auth';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.user$.pipe(map((user) => !!user));
  }

  async logout(): Promise<any> {
    this.authService.logOut().then((res) => {
      this.router.navigate(['/']);
    });
  }
  // ngOnInit(): void {
  //   this.authService.user$.subscribe((user) => {
  //     if (user) this.isAuth = true;
  //   });
  // }
}
