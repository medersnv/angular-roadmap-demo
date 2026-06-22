import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, defer, timer } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

/**
 * Сравнение ReplaySubject(5) и shareReplay(5). Оба буферизуют последние 5 значений и
 * переигрывают их новым подписчикам — поэтому их путают. Разница в природе:
 *
 *  • ReplaySubject — это Subject: ИСТОЧНИК здесь вы, значения проталкиваете сами через .next().
 *    Upstream-потока нет. Понятия «сколько раз выполнился источник» не существует.
 *
 *  • shareReplay — это ОПЕРАТОР поверх уже существующего (холодного) Observable. Он подписывается
 *    на источник ОДИН раз, мультикастит его и кэширует последние 5. Внутри использует ReplaySubject.
 */
@Injectable()
export class ReplayCompareService {
  // === ReplaySubject(5): вы — источник ===
  private readonly events = new ReplaySubject<number>(5);
  readonly events$ = this.events.asObservable();
  private eventValue = 0;

  /** Производитель — это вы: каждый клик вручную проталкивает значение в Subject. */
  emit(): void {
    this.eventValue += 10;
    this.events.next(this.eventValue);
  }

  // === shareReplay(5): обёртка над холодным источником ===
  private sourceRuns = 0;
  private readonly sourceRunsSubject = new BehaviorSubject<number>(0);
  readonly sourceRuns$ = this.sourceRunsSubject.asObservable();

  /**
   * Холодный источник с побочным эффектом (счётчик запусков) — имитация HTTP-потока,
   * выдающего серию значений. shareReplay(5) подпишется на него ОДИН раз на всех подписчиков
   * и переиграет последние 5; refCount по умолчанию false → результат кэшируется навсегда.
   */
  readonly shared$: Observable<number> = defer(() => {
    this.sourceRuns += 1;
    this.sourceRunsSubject.next(this.sourceRuns);
    return timer(0, 400).pipe(
      take(5),
      map((i) => (i + 1) * 10),
    );
  }).pipe(shareReplay(5));
}
