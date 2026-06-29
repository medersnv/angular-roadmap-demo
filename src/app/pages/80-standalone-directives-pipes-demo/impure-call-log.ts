import { Injectable } from '@angular/core';

/** Счётчик вызовов для impure-пайпа — отдельный от CallLog, чтобы не мешать pure-демо. */
@Injectable()
export class ImpureCallLog {
  count = 0;

  hit(): void {
    this.count += 1;
  }

  reset(): void {
    this.count = 0;
  }
}
