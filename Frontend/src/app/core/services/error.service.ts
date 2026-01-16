import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
    
  handle(error: any): void {
    let message = 'Ocurrió un error inesperado.';

    // Si es un error HTTP 
    if (error instanceof HttpErrorResponse) {
      // Caso: backend devuelve ApiResponse { message: string }
      const backendMsg = error.error?.message;

      // Si message viene como string
      if (typeof backendMsg === 'string' && backendMsg.trim()) {
        message = backendMsg;
      }

      // Si message viene como array 
      else if (Array.isArray(backendMsg) && backendMsg.length > 0) {
        message = backendMsg[0]; 
      }

      // Caso fallback: error.message (Angular)
      else if (typeof error.message === 'string' && error.message.trim()) {
        message = error.message;
      }

      //status 
      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor.';
      }
    }

    console.error('ErrorService:', error);
    alert(message);
  }
}
