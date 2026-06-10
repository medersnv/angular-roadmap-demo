import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CdrLiveData } from './live-data';
import { DataProvider } from './data-provider';

/**
 * Обёртка для примера detach() + reattach().
 * Чекбокс передаёт флаг live в дочерний CdrLiveData.
 */
@Component({
  selector: 'app-cdr-live-data-demo',
  providers: [DataProvider],
  imports: [CdrLiveData],
  templateUrl: './live-data-demo.html',
  styleUrl: './live-data-demo.scss',
})
export class CdrLiveDataDemo {
  /** true — UI обновляется; false — дочерний компонент detached. */
  protected readonly live = signal(true);

  private readonly dataProvider = inject(DataProvider);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Провайдер обновляет signal каждые 500 мс независимо от detach().
    this.dataProvider.start();
    this.destroyRef.onDestroy(() => this.dataProvider.stop());
  }

  onLiveChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.live.set(input.checked);
  }
}
