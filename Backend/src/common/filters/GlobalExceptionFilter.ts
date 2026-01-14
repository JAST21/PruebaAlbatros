import {
    ExceptionFilter,//interface que obliga a implementar el método catch()
    Catch,//decorador que marca la clase como un filtro de excepciones, Al no pasarle parámetros (@Catch()), captura cualquier error
    ArgumentsHost,//Permite acceder al contexto de ejecución (HTTP, GraphQL, RPC)
    HttpException,//clase base para todas las excepciones HTTP en NestJS
    HttpStatus,//Enum con los códigos HTTP (400, 404, 500, etc.)
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../responses/ApiResponse';

// Filtro global que captura cualquier excepción lanzada en la aplicación
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    // Método que se ejecuta automáticamente cuando ocurre una excepción
    catch(exception: unknown, host: ArgumentsHost) {

        // Se obtiene el contexto HTTP (request/response)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        ctx.getRequest<Request>();

        // Valores por defecto para errores no controlados
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Si la excepción es una HttpException (errores lanzados por NestJS)
        if (exception instanceof HttpException) {

            // Se obtiene el código de estado HTTP correspondiente
            status = exception.getStatus();

            // La respuesta del error puede ser un string o un objeto
            const res = exception.getResponse();

            // Se extrae el mensaje de error según el tipo de respuesta
            message =
                typeof res === 'string'// Si la respuesta es un string
                    ? res // se usa directamente como mensaje
                    : (res as any).message || exception.message; // Si es un objeto, se intenta obtener el campo 'message' o se usa el mensaje por defecto
        }

        // Se envía la respuesta con un formato estándar
        response.status(status).json(
            ApiResponse.error(message, status),
        );
    }
}