import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { DataListProvider } from './data-list-provider';

/**
 * Пример из документации Angular: detach() + detectChanges().
 * Компонент отключён от дерева CD — обновляем UI вручную раз в 5 секунд.
 */
@Component({
  selector: 'app-cdr-giant-list',
  providers: [DataListProvider],
  templateUrl: './giant-list.html',
  styleUrl: './giant-list.scss',
})
export class CdrGiantList implements OnInit {
  /** Время последнего вызова detectChanges() — для наглядности в UI. */
  lastCheck = '—';

  protected readonly dataProvider = inject(DataListProvider);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Отключаем view от глобального дерева change detection.
    // Пока detached — Angular не проверяет этот компонент автоматически.
    this.cdr.detach();
  }

  ngOnInit(): void {
    // Провайдер имитирует частые изменения данных (каждые 3000 мс).
    this.dataProvider.start(this.destroyRef);

    const intervalId = setInterval(() => {
      this.lastCheck = new Date().toLocaleTimeString();

      // Локальная проверка только этого view и его детей.
      this.cdr.detectChanges();
    }, 3000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }
}
