export class ApiResponse {

    // Método para respuestas exitosas
    static success(data: any, message: string = 'Request exitosa') {
        return {
            success: true,
            message,
            data
        };
    }

    // Método para respuestas de error
    static error(message: string, status = 400) {
        return {
            success: false,
            message,
            status
        };
    }
}