import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

const FRUITS = ['яблоко', 'банан', 'апельсин', 'груша', 'виноград', 'ананас', 'манго', 'персик'];

/** Поиск с debounce: слева Subject + subscribe, справа toObservable → toSignal. */
@Component({
  selector: 'app-rxjs-interop',
  templateUrl: './rxjs-interop.html',
  styleUrl: '../../../shared/compare.scss',
})
export class RxjsInterop {
  private readonly destroyRef = inject(DestroyRef);

  private filter(query: string): string[] {
    const q = query.trim().toLowerCase();
    return q ? FRUITS.filter((f) => f.includes(q)) : FRUITS;
  }

  // --- Раньше: Subject + ручная подписка/отписка ---
  protected readonly legacyTerm = signal('');
  protected readonly legacyResults = signal<string[]>(FRUITS);
  private readonly legacyTerm$ = new Subject<string>();

  constructor() {
    this.legacyTerm$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((q) => this.legacyResults.set(this.filter(q)));
  }

  protected onLegacyInput(value: string): void {
    this.legacyTerm.set(value);
    this.legacyTerm$.next(value);
  }

  // --- Сейчас: signal → toObservable → debounce → toSignal ---
  protected readonly term = signal('');
  protected readonly results = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((q) => this.filter(q)),
    ),
    { initialValue: FRUITS },
  );
}
