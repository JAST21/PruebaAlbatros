import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService) { }

    // Intercepta las solicitudes HTTP para manejar errores globalmente
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // Pasa la solicitud al siguiente manejador y captura errores
        return next.handle(req).pipe(
            catchError(err => {
                // Delego el manejo del error al servicio
                this.errorService.handle(err);

                // Re-lanzar el error para que el flujo continúe
                return throwError(() => err);
            })
        );
    }
}
