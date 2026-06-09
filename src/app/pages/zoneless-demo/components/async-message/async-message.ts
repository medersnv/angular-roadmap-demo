import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** async pipe подписывается и обновляет view — работает в zoneless. */
@Component({
  selector: 'app-zoneless-async-message',
  imports: [AsyncPipe],
  templateUrl: './async-message.html',
  styleUrl: './async-message.scss',
})
export class ZonelessAsyncMessage {
  private readonly messages = ['Привет', 'Как дела?', 'Zoneless + async pipe', 'Работает!'];
  private index = 0;

  protected readonly message$ = new BehaviorSubject(this.messages[0]);

  next(): void {
    this.index = (this.index + 1) % this.messages.length;
    this.message$.next(this.messages[this.index]);
  }

  reset(): void {
    this.index = 0;
    this.message$.next(this.messages[0]);
  }
}
