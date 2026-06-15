import { Component, computed, signal } from '@angular/core';

/** Производное поле руками рассинхронится; computed() выводится из base сам. */
@Component({
  selector: 'app-computed-memo',
  templateUrl: './computed-memo.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ComputedMemo {
  // --- Раньше: base и doubled — отдельные поля, синхронизируем руками ---
  protected readonly legacyBase = signal(2);
  protected readonly legacyDoubled = signal(4);
  protected readonly legacyStale = computed(() => this.legacyDoubled() !== this.legacyBase() * 2);

  protected legacyIncBoth(): void {
    this.legacyBase.update((v) => v + 1);
    this.legacyDoubled.set(this.legacyBase() * 2); // не забыть пересчитать
  }

  protected legacyIncForgot(): void {
    this.legacyBase.update((v) => v + 1); // забыли обновить doubled
  }

  protected legacyReset(): void {
    this.legacyBase.set(2);
    this.legacyDoubled.set(4);
  }

  // --- Сейчас: doubled / tripled выводятся из base автоматически ---
  protected readonly base = signal(2);
  protected readonly doubled = computed(() => this.base() * 2);
  protected readonly tripled = computed(() => this.base() * 3);

  protected inc(): void {
    this.base.update((v) => v + 1);
  }

  protected reset(): void {
    this.base.set(2);
  }
}
