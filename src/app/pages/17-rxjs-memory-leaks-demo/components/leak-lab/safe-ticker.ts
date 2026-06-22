import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { LeakLabService } from './leak-lab.service';

/**
 * ПРАВИЛЬНО: takeUntilDestroyed() привязывает время жизни подписки к компоненту.
 * При уничтожении (убрали из @if) поток завершается — таймер останавливается, утечки нет.
 * Это декларативная замена ngOnDestroy + Subject destroy$ (Angular 16+).
 */
@Component({
  selector: 'app-safe-ticker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pill pill-ok">safe подписан</span>`,
  styleUrl: '../../../shared/compare.scss',
})
export class SafeTicker {
  private readonly lab = inject(LeakLabService);

  constructor() {
    interval(700)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.lab.bumpSafe());
  }
}
