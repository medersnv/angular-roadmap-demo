import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { DataProvider } from './data-provider';

/**
 * Дочерний компонент для примера detach() + reattach().
 * При live = false отключается от CD — UI «замораживается»,
 * хотя DataProvider продолжает обновлять signal.
 */
@Component({
  selector: 'app-cdr-live-data',
  templateUrl: './live-data.html',
  styleUrl: './live-data.scss',
})
export class CdrLiveData {
  /** Флаг из родителя: включены ли «живые» обновления UI. */
  live = input.required<boolean>();

  protected readonly dataProvider = inject(DataProvider);

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      if (this.live()) {
        // Снова подключаем view к дереву change detection.
        this.cdr.reattach();
      } else {
        // Отключаем view — Angular перестаёт проверять этот компонент.
        this.cdr.detach();
      }
    });
  }
}
