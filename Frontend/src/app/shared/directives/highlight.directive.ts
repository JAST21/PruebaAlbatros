import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[appHighlight]",
    standalone: true
})
export class HighlightDirective {
    @Input() appHighlight = "#f5f5f5";

    constructor(private el: ElementRef) { }

    // Cambiar el color de fondo al entrar y salir del elemento
    @HostListener("mouseenter") onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = this.appHighlight;
    }

    // Restaurar el color de fondo al salir del elemento
    @HostListener("mouseleave") onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = "transparent";
    }


}