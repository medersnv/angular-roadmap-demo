import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LeakLabService } from './leak-lab.service';
import { LeakyTicker } from './leaky-ticker';
import { SafeTicker } from './safe-ticker';

/**
 * Стенд: монтируем/размонтируем два тикера и наблюдаем счётчики.
 * После размонтирования «дырявый» продолжает крутить число, «безопасный» замирает.
 */
@Component({
  selector: 'app-leak-lab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Сервис — root-синглтон (см. LeakLabService), на уровне компонента НЕ провайдим,
  // чтобы утечка пережила навигацию и осталась видимой.
  imports: [AsyncPipe, LeakyTicker, SafeTicker],
  templateUrl: './leak-lab.html',
  styleUrl: '../../../shared/compare.scss',
})
export class LeakLab {
  protected readonly lab = inject(LeakLabService);

  protected readonly leakyMounted = signal(false);
  protected readonly safeMounted = signal(false);

  protected toggleLeaky(): void {
    this.leakyMounted.update((v) => !v);
  }

  protected toggleSafe(): void {
    this.safeMounted.update((v) => !v);
  }

  /**
   * Отписывает оба тикера. Safe закрывается через takeUntilDestroyed при размонтировании,
   * а leaky — принудительно через сохранённые в сервисе ссылки (включая утёкшие до навигации).
   */
  protected unsubscribeBoth(): void {
    this.leakyMounted.set(false);
    this.safeMounted.set(false);
    this.lab.unsubscribeAllLeaks();
  }
}
