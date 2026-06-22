import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ReplayCompareService } from './replay-compare.service';

/**
 * Слева — ReplaySubject(5): вы пушите события, поздний подписчик получает последние 5.
 * Справа — shareReplay(5): один холодный источник на всех, поздний подписчик получает
 * последние 5, а источник выполняется ровно один раз.
 */
@Component({
  selector: 'app-replay-compare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReplayCompareService],
  imports: [AsyncPipe],
  templateUrl: './replay-compare.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ReplayCompare {
  protected readonly svc = inject(ReplayCompareService);
  private readonly destroyRef = inject(DestroyRef);

  // Поздний подписчик ReplaySubject.
  protected readonly rsLate = signal<number[] | null>(null);
  private rsLateSub?: Subscription;

  // Подписчики shareReplay.
  protected readonly srMain = signal<number[] | null>(null);
  protected readonly srLate = signal<number[] | null>(null);
  private srMainSub?: Subscription;
  private srLateSub?: Subscription;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.rsLateSub?.unsubscribe();
      this.srMainSub?.unsubscribe();
      this.srLateSub?.unsubscribe();
    });
  }

  protected connectReplayLate(): void {
    this.rsLate.set([]);
    this.rsLateSub?.unsubscribe();
    // ReplaySubject переиграет последние 5 пушнутых значений этому новому подписчику.
    this.rsLateSub = this.svc.events$.subscribe((v) =>
      this.rsLate.update((list) => [...(list ?? []), v]),
    );
  }

  protected subscribeShared(): void {
    this.srMain.set([]);
    this.srMainSub?.unsubscribe();
    this.srMainSub = this.svc.shared$.subscribe((v) =>
      this.srMain.update((list) => [...(list ?? []), v]),
    );
  }

  protected connectSharedLate(): void {
    this.srLate.set([]);
    this.srLateSub?.unsubscribe();
    // Источник НЕ перезапустится — shareReplay отдаст закэшированные последние 5.
    this.srLateSub = this.svc.shared$.subscribe((v) =>
      this.srLate.update((list) => [...(list ?? []), v]),
    );
  }
}
