import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ErrorService {

    handle(error: any): void {
        let message = 'Ocurrió un error inesperado.';

        if (error.error?.message) {
            message = error.error.message;
        }

        console.error('ErrorService:', message);
        alert(message);
    }
}