import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
  pure: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, word: string, highlightType = 'bold'): SafeHtml {
    if (!word) {
      return value;
    }
    const regex = new RegExp(`(${word})`, 'gi');
    const newValue = value.replace(regex, `<span class="highlight highlight--${highlightType}">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }

}
