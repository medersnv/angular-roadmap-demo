import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { interval } from 'rxjs';
import { LeakLabService } from './leak-lab.service';

/**
 * АНТИПАТТЕРН: подписка без отписки. interval() — бесконечный поток, а .subscribe()
 * здесь не закрывается ни в ngOnDestroy, ни через takeUntilDestroyed.
 * Когда компонент уничтожают (убирают из @if), таймер ПРОДОЛЖАЕТ тикать и держать
 * ссылку на замыкание — это и есть утечка.
 */
@Component({
  selector: 'app-leaky-ticker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pill pill-no">leaky подписан</span>`,
  styleUrl: '../../../shared/compare.scss',
})
export class LeakyTicker {
  private readonly lab = inject(LeakLabService);

  constructor() {
    // Нет takeUntilDestroyed → подписка переживёт компонент (утечка).
    const sub = interval(700).subscribe(() => this.lab.bumpLeaky());
    // Ссылку отдаём сервису: сам компонент её при уничтожении не закроет, но «рубильник»
    // в стенде сможет — это демонстрирует, что лечение утечки = сохранить ссылку и отписаться.
    this.lab.registerLeak(sub);
  }
}
