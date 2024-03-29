import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { RouterOutlet } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { CameraContainerComponent } from '../camera-container/camera-container.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet, CameraContainerComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  username: string;
  modalRef?: BsModalRef;
  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.username = user.displayName || user.email;
      }
    });
  }
}
