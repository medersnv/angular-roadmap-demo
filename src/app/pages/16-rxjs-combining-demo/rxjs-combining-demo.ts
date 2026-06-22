import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { CombineLatest } from './components/combine-latest/combine-latest';
import { ForkJoin } from './components/fork-join/fork-join';
import { WithLatestFrom } from './components/with-latest-from/with-latest-from';
import { Zip } from './components/zip/zip';
import { COMBINING_ESSENTIALS, COMBINING_MOMENTS } from './rxjs-combining-info';

@Component({
  selector: 'app-rxjs-combining-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CombineLatest, ForkJoin, WithLatestFrom, Zip],
  templateUrl: './rxjs-combining-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RxjsCombiningDemo {
  protected readonly meta = getCurriculumItem('rxjs-combining')!;
  protected readonly essentials = COMBINING_ESSENTIALS;
  protected readonly moments = COMBINING_MOMENTS;
}
