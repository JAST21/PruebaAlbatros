import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "truncate",
    standalone: true
})

export class TruncatePipe implements PipeTransform {

    // metodo para truncar texto a un limite especifico
    transform(value: string, limit: 100): string {
        return value.length > limit ? value.substring(0, limit) + "..." : value;
    }
}