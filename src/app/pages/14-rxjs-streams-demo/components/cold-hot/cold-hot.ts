import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColdHotService } from './cold-hot.service';

/** По клику три «подписчика» разом дёргают поток — считаем реальные запуски источника. */
@Component({
  selector: 'app-cold-hot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ColdHotService],
  imports: [AsyncPipe],
  templateUrl: './cold-hot.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ColdHot {
  protected readonly svc = inject(ColdHotService);
  // DestroyRef захватываем в поле (injection context) и передаём в takeUntilDestroyed,
  // т.к. в методах-обработчиках injection context уже недоступен.
  private readonly destroyRef = inject(DestroyRef);

  protected runCold(): void {
    for (let i = 0; i < 3; i++) {
      this.svc.subscribeColdTrio().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }

  protected runHot(): void {
    for (let i = 0; i < 3; i++) {
      this.svc.subscribeHotTrio().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }
}
