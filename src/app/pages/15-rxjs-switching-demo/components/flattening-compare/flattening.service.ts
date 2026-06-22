import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { concatMap, delay, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';

const TASK_MS = 1300; // имитация «долгого» запроса

/**
 * Один источник кликов прогоняется через четыре flattening-оператора одновременно.
 * Состояние — в приватных BehaviorSubject, наружу read-only Observable.
 * Так на одних и тех же данных видно разницу поведения операторов.
 */
@Injectable()
export class FlatteningService {
  private counter = 0;
  private readonly fireSubject = new Subject<number>();

  private readonly inputLogSubject = new BehaviorSubject<string[]>([]);
  private readonly switchLogSubject = new BehaviorSubject<string[]>([]);
  private readonly mergeLogSubject = new BehaviorSubject<string[]>([]);
  private readonly concatLogSubject = new BehaviorSubject<string[]>([]);
  private readonly exhaustLogSubject = new BehaviorSubject<string[]>([]);

  readonly inputLog$ = this.inputLogSubject.asObservable();
  readonly switchLog$ = this.switchLogSubject.asObservable();
  readonly mergeLog$ = this.mergeLogSubject.asObservable();
  readonly concatLog$ = this.concatLogSubject.asObservable();
  readonly exhaustLog$ = this.exhaustLogSubject.asObservable();

  // switchMap: отменяет предыдущий внутренний поток → завершится только последний клик.
  readonly switchDone$: Observable<number> = this.fireSubject.pipe(switchMap((id) => this.task(id)));
  // mergeMap: запускает все параллельно → завершатся все, в порядке готовности.
  readonly mergeDone$: Observable<number> = this.fireSubject.pipe(mergeMap((id) => this.task(id)));
  // concatMap: строгая очередь → все завершатся по порядку, друг за другом.
  readonly concatDone$: Observable<number> = this.fireSubject.pipe(concatMap((id) => this.task(id)));
  // exhaustMap: игнорирует клики, пока выполняется текущий → лишние клики пропадают.
  readonly exhaustDone$: Observable<number> = this.fireSubject.pipe(exhaustMap((id) => this.task(id)));

  fire(): void {
    const id = ++this.counter;
    this.push(this.inputLogSubject, `click #${id}`);
    this.fireSubject.next(id);
  }

  reset(): void {
    this.counter = 0;
    for (const s of [
      this.inputLogSubject,
      this.switchLogSubject,
      this.mergeLogSubject,
      this.concatLogSubject,
      this.exhaustLogSubject,
    ]) {
      s.next([]);
    }
  }

  logSwitch(id: number): void {
    this.push(this.switchLogSubject, `done #${id}`);
  }
  logMerge(id: number): void {
    this.push(this.mergeLogSubject, `done #${id}`);
  }
  logConcat(id: number): void {
    this.push(this.concatLogSubject, `done #${id}`);
  }
  logExhaust(id: number): void {
    this.push(this.exhaustLogSubject, `done #${id}`);
  }

  /** Имитация HTTP-запроса фиксированной длительности. */
  private task(id: number): Observable<number> {
    return of(id).pipe(delay(TASK_MS), map(() => id));
  }

  private push(subject: BehaviorSubject<string[]>, line: string): void {
    subject.next([...subject.value, line].slice(-6));
  }
}
