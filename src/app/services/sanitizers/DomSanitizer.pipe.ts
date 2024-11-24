import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

@Pipe({
    name: 'sanitize-transform'
})

export class SanitizePipe implements PipeTransform {
    sanitizer = inject(DomSanitizer)
    transform(value: string, ...args: any[]): any {
        this.sanitizer.sanitize(SecurityContext.SCRIPT,value)
        
    }
}