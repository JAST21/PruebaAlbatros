import { Component } from "@angular/core";
import { NotificationService } from "../../core/services/notification.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="message()" 
         class="fixed top-5 right-5 px-4 py-3 rounded shadow text-white"
         [ngClass]="{
           'bg-green-600': type() === 'success',
           'bg-red-600': type() === 'error'
         }">
      {{ message() }}
    </div>
  `
})
export class NotificationComponent {
    constructor(public notify: NotificationService) { }

    message = this.notify.message;
    type = this.notify.type;
}
