import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Subscription, interval, map } from 'rxjs';

/**
 * Центральный тезис RxJS: Observable — это «вывернутый» Iterator.
 * Pull: потребитель сам спрашивает следующее значение (next()).
 * Push: производитель сам присылает значения, когда они готовы.
 * «Развернули стрелки» в IEnumerable → получили IObservable.
 */
@Component({
  selector: 'app-pull-push',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pull-push.html',
  styleUrl: '../../../shared/compare.scss',
})
export class PullPush {
  private readonly destroyRef = inject(DestroyRef);

  // --- Pull (Iterator): значения берёт потребитель ---
  private readonly source = [10, 20, 30, 40];
  private pullIndex = 0;
  protected readonly pulled = signal<number[]>([]);
  protected readonly pullDone = signal(false);

  protected pullNext(): void {
    if (this.pullIndex >= this.source.length) {
      this.pullDone.set(true);
      return;
    }
    this.pulled.update((list) => [...list, this.source[this.pullIndex]]);
    this.pullIndex += 1;
  }

  protected resetPull(): void {
    this.pullIndex = 0;
    this.pulled.set([]);
    this.pullDone.set(false);
  }

  // --- Push (Observable): значения присылает производитель ---
  protected readonly pushed = signal<number[]>([]);
  protected readonly pushing = signal(false);
  private pushSub?: Subscription;

  constructor() {
    this.destroyRef.onDestroy(() => this.pushSub?.unsubscribe());
  }

  protected startPush(): void {
    if (this.pushing()) {
      return;
    }
    this.pushing.set(true);
    this.pushed.set([]);
    // Производитель сам «толкает» значения раз в 600 мс — потребитель лишь реагирует.
    this.pushSub = interval(600)
      .pipe(map((i) => (i + 1) * 10))
      .subscribe((v) => this.pushed.update((list) => [...list, v]));
  }

  protected stopPush(): void {
    this.pushSub?.unsubscribe();
    this.pushing.set(false);
  }
}
