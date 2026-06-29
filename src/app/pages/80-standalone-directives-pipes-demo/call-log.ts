import { Injectable } from '@angular/core';

/**
 * Считает, сколько раз пайп реально выполнил transform().
 * Счётчик — обычное поле (не signal): писать в signal во время рендера
 * шаблона запрещено (NG0600). Перерисовка и так происходит по сигналам
 * term/tick, поэтому значение в шаблоне обновляется вовремя.
 */
@Injectable()
export class CallLog {
  count = 0;

  hit(): void {
    this.count += 1;
  }

  reset(): void {
    this.count = 0;
  }
}
