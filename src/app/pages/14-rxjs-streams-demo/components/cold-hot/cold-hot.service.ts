import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/**
 * Источник истины — приватные BehaviorSubject со счётчиками реальных запусков источника.
 * Наглядно: холодный Observable перезапускает «запрос» на каждого подписчика (unicast),
 * shareReplay делает его горячим и переиспользует результат (multicast).
 */
@Injectable()
export class ColdHotService {
  private readonly coldRunsSubject = new BehaviorSubject<number>(0);
  private readonly hotRunsSubject = new BehaviorSubject<number>(0);

  readonly coldRuns$ = this.coldRunsSubject.asObservable();
  readonly hotRuns$ = this.hotRunsSubject.asObservable();

  // Холодный: defer пересоздаёт источник на КАЖДУЮ подписку → новый «HTTP-запрос».
  private readonly cold$: Observable<string> = defer(() => {
    this.coldRunsSubject.next(this.coldRunsSubject.value + 1);
    return timer(300).pipe(map(() => 'data'));
  });

  // Горячий: shareReplay(1) кэширует результат и раздаёт всем подписчикам — один запрос на трио.
  // refCount: true → когда подписчиков не осталось, источник отпускается и буфер сбрасывается,
  // поэтому каждый новый «раунд» из 3 подписчиков = ровно один запуск источника (и демо повторяемо).
  private readonly hot$: Observable<string> = defer(() => {
    this.hotRunsSubject.next(this.hotRunsSubject.value + 1);
    return timer(300).pipe(map(() => 'data'));
  }).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  /** Три «компонента» подписываются на холодный поток одновременно. */
  subscribeColdTrio(): Observable<string> {
    return this.cold$;
  }

  /** Три «компонента» подписываются на горячий поток одновременно. */
  subscribeHotTrio(): Observable<string> {
    return this.hot$;
  }

  reset(): void {
    this.coldRunsSubject.next(0);
    this.hotRunsSubject.next(0);
  }
}
