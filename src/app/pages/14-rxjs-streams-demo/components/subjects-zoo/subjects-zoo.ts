import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatStateService } from './chat-state.service';

/**
 * Слева — «ранний» подписчик (через AsyncPipe), видит всё с самого начала.
 * Справа — «поздний» подписчик: подключается по кнопке и сразу получает
 * текущий статус (BehaviorSubject) и последние 5 сообщений (ReplaySubject).
 */
@Component({
  selector: 'app-subjects-zoo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatStateService],
  imports: [AsyncPipe],
  templateUrl: './subjects-zoo.html',
  styleUrl: '../../../shared/compare.scss',
})
export class SubjectsZoo {
  protected readonly chat = inject(ChatStateService);
  private readonly destroyRef = inject(DestroyRef);

  // Состояние «позднего» подписчика — он подключается уже после череды сообщений.
  protected readonly lateConnected = signal(false);
  protected readonly lateStatus = signal<string | null>(null);
  protected readonly lateMessages = signal<string[]>([]);
  private lateSub?: Subscription;

  constructor() {
    // Даже на странице про потоки отписку держим под контролем.
    this.destroyRef.onDestroy(() => this.lateSub?.unsubscribe());
  }

  protected connectLate(): void {
    this.lateConnected.set(true);
    this.lateStatus.set(null);
    this.lateMessages.set([]);

    this.lateSub = new Subscription();
    // BehaviorSubject → новый подписчик мгновенно получает ТЕКУЩИЙ статус.
    this.lateSub.add(this.chat.status$.subscribe((s) => this.lateStatus.set(s)));
    // ReplaySubject(5) → новый подписчик мгновенно получает последние 5 сообщений.
    this.lateSub.add(
      this.chat.messages$.subscribe((m) => this.lateMessages.update((list) => [...list, m.text])),
    );
  }

  protected disconnectLate(): void {
    this.lateSub?.unsubscribe();
    this.lateConnected.set(false);
  }
}
