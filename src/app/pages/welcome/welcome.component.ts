import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastContainerComponent } from '../toast-container/toast-container.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ToastContainerComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  username: string;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.username = user.displayName || user.email;
      }
    });
  }
}
