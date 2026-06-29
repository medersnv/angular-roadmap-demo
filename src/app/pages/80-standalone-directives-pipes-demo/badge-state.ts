import { Injectable, signal } from '@angular/core';

/** Внешнее состояние, которое читает impure-пайп через inject() — без передачи аргументом. */
@Injectable()
export class BadgeState {
  readonly badge = signal('');
}
