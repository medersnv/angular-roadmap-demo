import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

/**
 * Состояние стенда живёт в приватных BehaviorSubject, наружу — read-only Observable.
 * Дочерние «тикеры» сообщают сюда о своих тиках, страница лишь наблюдает за числами.
 *
 * ВАЖНО: сервис — singleton (providedIn: 'root'), а НЕ провайдится на уровне компонента.
 * Иначе при уходе со страницы сервис уничтожался бы вместе со счётчиками, и «утёкший»
 * interval бил бы по выброшенному инстансу — утечку нельзя было бы увидеть после навигации.
 * С root-синглтоном дырявая подписка продолжает крутить счётчик, даже когда вы ушли и вернулись.
 */
@Injectable({ providedIn: 'root' })
export class LeakLabService {
  private readonly leakyTicksSubject = new BehaviorSubject<number>(0);
  private readonly safeTicksSubject = new BehaviorSubject<number>(0);
  // Сколько «забытых» подписок реально живёт прямо сейчас (растёт с каждым монтированием).
  private readonly aliveLeaksSubject = new BehaviorSubject<number>(0);

  readonly leakyTicks$ = this.leakyTicksSubject.asObservable();
  readonly safeTicks$ = this.safeTicksSubject.asObservable();
  readonly aliveLeaks$ = this.aliveLeaksSubject.asObservable();

  // Ссылки на «дырявые» подписки. В реальной утечке их НЕ хранят — и тогда interval нечем
  // остановить. Здесь храним намеренно, чтобы кнопка-«рубильник» смогла их принудительно закрыть.
  private leakySubs = new Subscription();

  bumpLeaky(): void {
    this.leakyTicksSubject.next(this.leakyTicksSubject.value + 1);
  }

  bumpSafe(): void {
    this.safeTicksSubject.next(this.safeTicksSubject.value + 1);
  }

  /** Дырявый тикер отдаёт сюда свою подписку при создании — иначе её было бы не закрыть. */
  registerLeak(sub: Subscription): void {
    this.leakySubs.add(sub);
    this.aliveLeaksSubject.next(this.aliveLeaksSubject.value + 1);
  }

  /**
   * Принудительно закрывает ВСЕ накопленные дырявые подписки — включая утёкшие до навигации
   * (сервис root-синглтон, ссылки пережили переходы между страницами). interval'ы останавливаются.
   * Это и есть «лечение» утечки: сохранить ссылку и вызвать unsubscribe().
   */
  unsubscribeAllLeaks(): void {
    this.leakySubs.unsubscribe();
    this.leakySubs = new Subscription(); // прежний контейнер закрыт навсегда — заводим новый
    this.aliveLeaksSubject.next(0);
  }

  /**
   * Сбрасывает только счётчики тиков. Число живых утечек НЕ трогаем — оно честное:
   * пока подписки живы, leaky-счётчик тут же поползёт обратно (остановить их может только
   * кнопка «Отписаться от всех»).
   */
  resetTicks(): void {
    this.leakyTicksSubject.next(0);
    this.safeTicksSubject.next(0);
  }
}
