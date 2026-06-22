import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FlatteningService } from './flattening.service';

/**
 * Живой стенд: быстро нажмите кнопку несколько раз и сравните, какие «запросы»
 * завершатся у каждого оператора.
 */
@Component({
  selector: 'app-flattening-compare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlatteningService],
  imports: [AsyncPipe],
  templateUrl: './flattening-compare.html',
  styleUrl: '../../../shared/compare.scss',
})
export class FlatteningCompare {
  protected readonly flat = inject(FlatteningService);

  constructor() {
    // Подписки на «done»-потоки держим в TS → закрываем через takeUntilDestroyed.
    this.flat.switchDone$.pipe(takeUntilDestroyed()).subscribe((id) => this.flat.logSwitch(id));
    this.flat.mergeDone$.pipe(takeUntilDestroyed()).subscribe((id) => this.flat.logMerge(id));
    this.flat.concatDone$.pipe(takeUntilDestroyed()).subscribe((id) => this.flat.logConcat(id));
    this.flat.exhaustDone$.pipe(takeUntilDestroyed()).subscribe((id) => this.flat.logExhaust(id));
  }
}
