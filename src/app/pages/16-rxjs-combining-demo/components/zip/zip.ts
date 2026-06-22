import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ZipPairService } from './zip-pair.service';

/** Живой пример zip: буквы и числа склеиваются строго по индексу — A1, B2, C3. */
@Component({
  selector: 'app-zip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ZipPairService],
  imports: [AsyncPipe],
  templateUrl: './zip.html',
  styleUrl: '../../../shared/compare.scss',
})
export class Zip {
  protected readonly pair = inject(ZipPairService);

  constructor() {
    // Подписку на склеенные пары держим в TS → takeUntilDestroyed закрывает её
    // при уничтожении компонента (память не течёт).
    this.pair.zipped$.pipe(takeUntilDestroyed()).subscribe((p) => this.pair.registerPair(p));
  }
}
