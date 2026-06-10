import { DestroyRef, Injectable } from '@angular/core';

/**
 * Имитирует источник данных, который меняется чаще, чем нужно обновлять UI.
 * Используется в примере detach() + detectChanges().
 */
@Injectable()
export class DataListProvider {
  /** Сколько раз getter data вызван — только при detectChanges(). */
  readCount = 0;

  /** Внутренняя версия — растёт каждые 200 мс в фоне. */
  private version = 0;

  /** Запускает фоновое «обновление данных» каждые 200 мс. */
  start(destroyRef: DestroyRef): void {
    const intervalId = setInterval(() => {
      this.version++;
    }, 200);

    destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  /**
   * Getter возвращает новый массив при каждом чтении.
   * В шаблоне вызывается только когда срабатывает detectChanges().
   */
  get data(): number[] {
    this.readCount++;
    return [1, 2, 3, 4, 5].map((item) => item + this.version);
  }
}
