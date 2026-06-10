import { Injectable, signal } from '@angular/core';

/**
 * Имитирует поток «живых» данных (WebSocket, polling и т.п.).
 * Обновления идут в signal — но UI увидит их только если view attached.
 */
@Injectable()
export class DataProvider {
  readonly data = signal(1);
  readonly tickCount = signal(0);

  private intervalId?: ReturnType<typeof setInterval>;

  /** Запускает периодическое обновление данных. */
  start(): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.tickCount.update((value) => value + 1);
      this.data.update((value) => value + 1);
    }, 3000);
  }

  /** Останавливает таймер при уничтожении демо-компонента. */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
