import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface ChatMessage {
  author: string;
  text: string;
}

/**
 * Демонстрация двух типов Subject как multicasting-посредников:
 *  - BehaviorSubject — текущее состояние UI (SSOT): хранит ОДНО последнее значение,
 *    новый подписчик сразу получает его. Требует начальное значение.
 *  - ReplaySubject(5) — кэш истории: буферизует последние 5 сообщений и переигрывает
 *    их каждому новому подписчику (например, при позднем входе в чат).
 *
 * Состояние приватное, наружу — только read-only Observable через asObservable().
 */
@Injectable()
export class ChatStateService {
  // Текущее состояние присутствия — всегда есть «последнее».
  private readonly statusSubject = new BehaviorSubject<'online' | 'away'>('online');
  // Последние 5 сообщений — для тех, кто подключится позже.
  private readonly messagesSubject = new ReplaySubject<ChatMessage>(5);

  readonly status$ = this.statusSubject.asObservable();
  readonly messages$ = this.messagesSubject.asObservable();

  private counter = 0;

  setStatus(status: 'online' | 'away'): void {
    this.statusSubject.next(status);
  }

  send(text: string): void {
    this.counter += 1;
    this.messagesSubject.next({ author: 'me', text: `${text} #${this.counter}` });
  }
}
