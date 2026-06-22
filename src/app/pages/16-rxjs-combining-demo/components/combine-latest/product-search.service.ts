import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, startWith } from 'rxjs/operators';

export interface ProductQuery {
  term: string;
  category: string;
  page: number;
}

export interface ProductResult {
  query: ProductQuery;
  items: string[];
  total: number;
}

const CATALOG: Record<string, string[]> = {
  phones: ['iPhone 15', 'Pixel 8', 'Galaxy S24', 'Nothing Phone', 'Xperia 1'],
  laptops: ['MacBook Air', 'ThinkPad X1', 'Dell XPS', 'Framework 13', 'ROG Zephyrus'],
  audio: ['AirPods Pro', 'Sony WH-1000XM5', 'Bose QC', 'Sennheiser HD', 'Jabra Elite'],
};

const PAGE_SIZE = 2;

/**
 * Источник истины живёт в приватных BehaviorSubject'ах, наружу торчат только
 * read-only Observable. UI не дёргает API руками — он лишь меняет три независимых
 * потока (поиск / категория / страница), а сервис сам пересобирает запрос.
 */
@Injectable()
export class ProductSearchService {
  // --- Приватное состояние: три независимых input-потока ---
  private readonly termSubject = new BehaviorSubject<string>('');
  private readonly categorySubject = new BehaviorSubject<string>('phones');
  private readonly pageSubject = new BehaviorSubject<number>(1);

  // --- Публичные read-only проекции состояния (для подсветки текущих значений) ---
  readonly term$ = this.termSubject.asObservable();
  readonly category$ = this.categorySubject.asObservable();
  readonly page$ = this.pageSubject.asObservable();

  /**
   * combineLatest, потому что нам нужен ОДИН запрос, отражающий последние значения
   * ВСЕХ трёх фильтров сразу. В отличие от zip он не ждёт нового значения от каждого
   * источника — берёт последнее известное; в отличие от merge — комбинирует, а не
   * чередует. Любое изменение поиска / категории / страницы → один пересчёт запроса.
   */
  readonly results$: Observable<ProductResult> = combineLatest([
    this.termSubject.pipe(
      debounceTime(300),        // гасим дребезг ввода — не бьём по API на каждую букву
      distinctUntilChanged(),
    ),
    this.categorySubject.pipe(distinctUntilChanged()),
    this.pageSubject.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([term, category, page]): ProductQuery => ({ term, category, page })),
    // switchMap отменяет предыдущий запрос, когда фильтры поменялись быстрее ответа
    switchMap((query) => this.fetch(query)),
    startWith({ query: { term: '', category: 'phones', page: 1 }, items: [], total: 0 }),
  );

  setTerm(term: string): void {
    this.termSubject.next(term);
  }

  setCategory(category: string): void {
    this.categorySubject.next(category);
    this.pageSubject.next(1); // смена категории сбрасывает пагинацию
  }

  setPage(page: number): void {
    this.pageSubject.next(page);
  }

  /** Имитация HTTP: фильтрация + пагинация на «сервере» с искусственной задержкой. */
  private fetch(query: ProductQuery): Observable<ProductResult> {
    const source = CATALOG[query.category] ?? [];
    const filtered = source.filter((name) =>
      name.toLowerCase().includes(query.term.trim().toLowerCase()),
    );
    const from = (query.page - 1) * PAGE_SIZE;
    const items = filtered.slice(from, from + PAGE_SIZE);
    return of({ query, items, total: filtered.length }).pipe(delay(250));
  }
}
