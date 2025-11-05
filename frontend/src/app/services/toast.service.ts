import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private nextId = 1;

  getToasts() {
    return this.toasts$.asObservable();
  }

  show(type: Toast['type'], message: string, duration: number = 3000) {
    const toast: Toast = {
      id: this.nextId++,
      type,
      message
    };

    const current = this.toasts$.value;
    this.toasts$.next([...current, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  info(message: string) {
    this.show('info', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  remove(id: number) {
    const current = this.toasts$.value;
    this.toasts$.next(current.filter(t => t.id !== id));
  }
}
