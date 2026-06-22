import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { asapScheduler, asyncScheduler, of } from 'rxjs';
import { observeOn } from 'rxjs/operators';

/**
 * Schedulers управляют тем, КОГДА и в каком контексте Event Loop доставляются значения.
 * Демонстрация порядка: синхронный код → микрозадачи (asap) → макрозадачи (async).
 */
@Component({
  selector: 'app-schedulers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedulers.html',
  styleUrl: '../../../shared/compare.scss',
})
export class Schedulers {
  protected readonly log = signal<string[]>([]);

  protected run(): void {
    this.log.set([]);

    // async (setTimeout-очередь, макрозадача) — отдаёт поток UI, низкий приоритет.
    of('async').pipe(observeOn(asyncScheduler)).subscribe((v) => this.append(v));

    // asap (микрозадача, как у Promise) — выполнится раньше async, но после синхронного.
    of('asap').pipe(observeOn(asapScheduler)).subscribe((v) => this.append(v));

    // По умолчанию без планировщика — синхронно, прямо сейчас.
    of('sync').subscribe((v) => this.append(v));

    // Обычный синхронный код после всех subscribe.
    this.append('— конец синхронного блока —');
  }

  private append(line: string): void {
    this.log.update((list) => [...list, line]);
  }
}
