import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sentenceCase',
  standalone: true
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (!value) return '';

    return Array.isArray(value)
      ? value.map(str => SentenceCasePipe.capitalizeFirst(str)).join(', ')
      : SentenceCasePipe.capitalizeFirst(value);
  }

  private static capitalizeFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }
}
