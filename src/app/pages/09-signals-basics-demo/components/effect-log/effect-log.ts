import { Component, effect, signal } from '@angular/core';

/** Раньше лог дублировали в каждом обработчике; effect() объявляется один раз. */
@Component({
  selector: 'app-effect-log',
  templateUrl: './effect-log.html',
  styleUrl: '../../../shared/compare.scss',
})
export class EffectLog {
  // --- Раньше: запись в лог руками в каждом методе ---
  protected readonly legacyValue = signal(0);
  protected readonly legacyLog = signal<string[]>([]);

  private legacyRecord(): void {
    this.legacyLog.update((lines) => [`value = ${this.legacyValue()}`, ...lines].slice(0, 8));
  }

  protected legacyInc(): void {
    this.legacyValue.update((v) => v + 1);
    this.legacyRecord();
  }

  protected legacyDec(): void {
    this.legacyValue.update((v) => v - 1);
    this.legacyRecord();
  }

  protected legacyReset(): void {
    this.legacyValue.set(0); // намеренно без legacyRecord() — легко забыть
  }

  // --- Сейчас: effect() ловит любое изменение value ---
  protected readonly value = signal(0);
  protected readonly log = signal<string[]>([]);

  constructor() {
    effect(() => {
      const current = this.value();
      this.log.update((lines) => [`value = ${current}`, ...lines].slice(0, 8));
    });
  }

  protected inc(): void {
    this.value.update((v) => v + 1);
  }

  protected dec(): void {
    this.value.update((v) => v - 1);
  }

  protected reset(): void {
    this.value.set(0); // effect залогирует сам
  }
}
