import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, zip } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Канонический пример zip: два НЕЗАВИСИМЫХ потока склеиваются строго по индексу —
 * 1-я буква с 1-м числом, 2-я со 2-м и т.д. (как в марбл-диаграмме: A1, B2, C3).
 *
 * Состояние — в приватных BehaviorSubject, наружу read-only Observable.
 * Каждым потоком управляет пользователь своей кнопкой — никаких таймеров и «магии».
 */
@Injectable()
export class ZipPairService {
  private readonly lettersSubject = new Subject<string>();
  private readonly numbersSubject = new Subject<number>();

  private letterCount = 0;
  private numberCount = 0;

  private readonly lettersSentSubject = new BehaviorSubject<string[]>([]);
  private readonly numbersSentSubject = new BehaviorSubject<number[]>([]);
  private readonly pairsSubject = new BehaviorSubject<string[]>([]);

  readonly lettersSent$ = this.lettersSentSubject.asObservable();
  readonly numbersSent$ = this.numbersSentSubject.asObservable();
  readonly pairs$ = this.pairsSubject.asObservable();

  /**
   * zip ждёт значение ОТ ОБОИХ потоков и склеивает их по позиции. Пока второй поток молчит,
   * значения первого копятся в буфере — ни одно не теряется и не дублируется.
   * (combineLatest выдавал бы «срез последних» с повторами, withLatestFrom — терял бы значения.)
   */
  readonly zipped$: Observable<string> = zip(this.lettersSubject, this.numbersSubject).pipe(
    map(([letter, num]) => `${letter}${num}`),
  );

  sendLetter(): void {
    const letter = String.fromCharCode(65 + (this.letterCount % 26)); // A, B, C, …
    this.letterCount += 1;
    this.lettersSentSubject.next([...this.lettersSentSubject.value, letter]);
    this.lettersSubject.next(letter);
  }

  sendNumber(): void {
    this.numberCount += 1;
    this.numbersSentSubject.next([...this.numbersSentSubject.value, this.numberCount]);
    this.numbersSubject.next(this.numberCount);
  }

  /** Компонент сообщает о каждой склеенной паре — обновляем read-only состояние. */
  registerPair(pair: string): void {
    this.pairsSubject.next([...this.pairsSubject.value, pair]);
  }

  reset(): void {
    this.letterCount = 0;
    this.numberCount = 0;
    this.lettersSentSubject.next([]);
    this.numbersSentSubject.next([]);
    this.pairsSubject.next([]);
  }
}
