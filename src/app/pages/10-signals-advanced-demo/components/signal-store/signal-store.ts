import { Component, Injectable, computed, inject, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartLine {
  product: Product;
  qty: number;
}

const CATALOG: Product[] = [
  { id: 1, name: 'Кофе', price: 250 },
  { id: 2, name: 'Чай', price: 180 },
  { id: 3, name: 'Печенье', price: 120 },
];

/**
 * Реактивное хранилище на сигналах: приватный writable под капотом,
 * публичные computed для производного, методы для мутаций.
 */
@Injectable()
export class CartStore {
  private readonly _lines = signal<CartLine[]>([]);
  readonly lines = this._lines.asReadonly();

  readonly count = computed(() => this._lines().reduce((n, l) => n + l.qty, 0));
  readonly total = computed(() => this._lines().reduce((s, l) => s + l.qty * l.product.price, 0));
  readonly isEmpty = computed(() => this._lines().length === 0);

  add(product: Product): void {
    this._lines.update((lines) => {
      const existing = lines.find((l) => l.product.id === product.id);
      return existing
        ? lines.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { product, qty: 1 }];
    });
  }

  remove(id: number): void {
    this._lines.update((lines) =>
      lines.map((l) => (l.product.id === id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0),
    );
  }

  clear(): void {
    this._lines.set([]);
  }
}

@Component({
  selector: 'app-signal-store',
  providers: [CartStore],
  templateUrl: './signal-store.html',
  styleUrl: '../../../shared/compare.scss',
})
export class SignalStore {
  protected readonly catalog = CATALOG;
  protected readonly store = inject(CartStore);
}
