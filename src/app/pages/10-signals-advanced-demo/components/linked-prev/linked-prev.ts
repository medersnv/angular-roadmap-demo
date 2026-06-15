import { Component, computed, linkedSignal, signal } from '@angular/core';

const USERS = ['Анна', 'Борис', 'Вера', 'Глеб', 'Дина'];

/** linkedSignal с computation(source, previous) сохраняет выбор, пока он валиден. */
@Component({
  selector: 'app-linked-prev',
  templateUrl: './linked-prev.html',
  styleUrl: '../../../shared/compare.scss',
})
export class LinkedPrev {
  private filterUsers(text: string): string[] {
    const q = text.trim().toLowerCase();
    return USERS.filter((u) => u.toLowerCase().includes(q));
  }

  // --- Раньше: при любом изменении фильтра — на первый ---
  protected readonly legacyFilter = signal('');
  protected readonly legacyFiltered = computed(() => this.filterUsers(this.legacyFilter()));
  protected readonly legacySelected = signal<string>(USERS[0]);

  protected setLegacyFilter(text: string): void {
    this.legacyFilter.set(text);
    this.legacySelected.set(this.legacyFiltered()[0] ?? ''); // выбор теряется
  }

  protected pickLegacy(user: string): void {
    this.legacySelected.set(user);
  }

  // --- Сейчас: сохраняем previous, если он ещё в списке ---
  protected readonly filter = signal('');
  protected readonly filtered = computed(() => this.filterUsers(this.filter()));
  protected readonly selected = linkedSignal<string[], string>({
    source: this.filtered,
    computation: (list, previous) => {
      const prev = previous?.value;
      return prev && list.includes(prev) ? prev : (list[0] ?? '');
    },
  });

  protected setFilter(text: string): void {
    this.filter.set(text);
  }

  protected pick(user: string): void {
    this.selected.set(user);
  }
}
