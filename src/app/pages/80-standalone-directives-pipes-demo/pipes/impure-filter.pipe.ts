import { inject, Pipe, PipeTransform } from '@angular/core';
import { BadgeState } from '../badge-state';

/**
 * Impure-пайп (pure: false): transform() вызывается на каждый change detection.
 * Читает BadgeState через inject() — это состояние НЕ передаётся аргументом.
 * Когда badge меняется, pure-пайп ничего не знает (кэш), impure — читает и реагирует.
 */
@Pipe({
  name: 'impureFilterBy',
  pure: false,
})
export class ImpureFilterByPipe implements PipeTransform {
  private readonly state = inject(BadgeState);

  transform(list: readonly string[], term: string): string[] {
    const badge = this.state.badge();
    const q = term.trim().toLowerCase();
    const filtered = q ? list.filter((i) => i.toLowerCase().includes(q)) : [...list];
    return badge ? filtered.map((i) => `${badge} ${i}`) : filtered;
  }
}
