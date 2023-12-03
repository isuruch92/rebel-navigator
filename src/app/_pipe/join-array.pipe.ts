import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'joinArray',
  standalone: true
})
export class JoinArrayPipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }
}
