import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultChild } from './components/default-child/default-child';
import { OnpushAsyncChild } from './components/onpush-async-child/onpush-async-child';
import { OnpushChild } from './components/onpush-child/onpush-child';
import { OnpushSignalChild } from './components/onpush-signal-child/onpush-signal-child';
import { BEST_PRACTICES, ONPUSH_VS_DEFAULT, STRATEGIES } from './onpush-info';

@Component({
  selector: 'app-onpush-demo',
  imports: [DefaultChild, OnpushChild, OnpushAsyncChild, OnpushSignalChild],
  templateUrl: './onpush-demo.html',
  styleUrl: './onpush-demo.scss',
})
export class OnpushDemo {
  user = { name: 'Meder' };

  private messageStep = 1;
  private readonly messageSubject = new BehaviorSubject('Сообщение 1');
  protected readonly message$ = this.messageSubject.asObservable();

  protected readonly strategies = STRATEGIES;
  protected readonly bestPractices = BEST_PRACTICES;
  protected readonly comparison = ONPUSH_VS_DEFAULT;

  mutateName(): void {
    this.user.name = 'Алекс';
  }

  replaceUser(): void {
    this.user = { name: 'Нурсултан' };
  }

  reset(): void {
    this.user = { name: 'Meder' };
  }

  nextMessage(): void {
    this.messageStep++;
    this.messageSubject.next(`Сообщение ${this.messageStep}`);
  }

  resetMessage(): void {
    this.messageStep = 1;
    this.messageSubject.next('Сообщение 1');
  }
}
