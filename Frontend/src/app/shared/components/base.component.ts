import { Location } from '@angular/common';

// Componente base para manejar la navegación hacia atrás
export abstract class BaseComponent {
    constructor(protected location: Location) { }

    // Método para navegar a la página anterior
    goBack(): void {
        this.location.back();
    }
}