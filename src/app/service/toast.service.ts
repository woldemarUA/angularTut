import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { ToastOptions } from '../interface/toast-options';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(text: string, options: ToastOptions = {}) {
    const toast = { text, ...options };

    this.toasts.push(toast);
    if (toast.delay) {
      setTimeout(() => this.remove(toast), toast.delay);
    }
  }

  showSuccess(text: string) {
    this.show(text, {
      className: 'bg-success text-light',
      delay: 3500,
      autohide: true,
    });
  }

  showFailrue(text: string) {
    this.show(text, {
      className: 'bg-danger text-light',
      delay: 3500,
      autohide: true,
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
