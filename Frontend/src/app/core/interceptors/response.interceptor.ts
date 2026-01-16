import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private notify: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (!(event instanceof HttpResponse)) return;

                const body = event.body;

                // Solo si sigue tu formato ApiResponse
                if (!body || body.success !== true) return;

                // Solo para mutaciones
                if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                    if (typeof body.message === 'string' && body.message.trim()) {
                        this.notify.showSuccess(body.message);
                    }
                }
            })
        );
    }
}
