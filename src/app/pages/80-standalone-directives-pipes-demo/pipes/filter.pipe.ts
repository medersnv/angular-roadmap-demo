import { inject, Pipe, PipeTransform } from '@angular/core';
import { CallLog } from '../call-log';

/**
 * Pure-пайп (по умолчанию): transform() вызывается только при смене аргументов.
 * Инжектит CallLog, чтобы наглядно показать число реальных вызовов.
 */
@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  private readonly log = inject(CallLog);

  transform(list: readonly string[], term: string): string[] {
    this.log.hit();
    const q = term.trim().toLowerCase();
    return q ? list.filter((item) => item.toLowerCase().includes(q)) : [...list];
  }
}
