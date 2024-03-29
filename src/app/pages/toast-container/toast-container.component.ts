import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../service/toast.service';
import { ToastOptions } from '../../interface/toast-options';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
  showToast(text: string, options: ToastOptions) {
    this.toastService.show(text, options);
  }
}
