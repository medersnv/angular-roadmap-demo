import { Component, effect, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
}

/** Слева ссылочное равенство, справа equal по id — лишние set отсекаются. */
@Component({
  selector: 'app-equality-signal',
  templateUrl: './equality-signal.html',
  styleUrl: '../../../shared/compare.scss',
})
export class EqualitySignal {
  // --- По умолчанию: Object.is (ссылка) ---
  protected readonly defUser = signal<User>({ id: 1, name: 'Анна' });
  protected readonly defUpdates = signal(0);

  // --- equal по id ---
  protected readonly idUser = signal<User>({ id: 1, name: 'Анна' }, { equal: (a, b) => a.id === b.id });
  protected readonly idUpdates = signal(0);

  constructor() {
    effect(() => {
      this.defUser();
      this.defUpdates.update((n) => n + 1);
    });
    effect(() => {
      this.idUser();
      this.idUpdates.update((n) => n + 1);
    });
  }

  /** Новый объект с тем же id и именем. */
  protected setSame(): void {
    this.defUser.set({ id: 1, name: 'Анна' });
    this.idUser.set({ id: 1, name: 'Анна' });
  }

  /** Новый объект с другим id. */
  protected setDifferent(): void {
    this.defUser.update((u) => ({ id: u.id + 1, name: 'Глеб' }));
    this.idUser.update((u) => ({ id: u.id + 1, name: 'Глеб' }));
  }
}
