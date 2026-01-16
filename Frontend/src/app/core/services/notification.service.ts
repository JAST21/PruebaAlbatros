import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    message = signal<string | null>(null);
    type = signal<'success' | 'error' | 'info'>('info');

    // Muestra un mensaje de éxito
    showSuccess(msg: string) {
        this.type.set('success');
        this.message.set(msg);
        this.autoClear();
    }

    // Muestra un mensaje de error
    showError(msg: string) {
        this.type.set('error');
        this.message.set(msg);
        this.autoClear();
    }

    // Limpia el mensaje después de un tiempo
    private autoClear() {
        setTimeout(() => this.message.set(null), 3000);
    }
}
