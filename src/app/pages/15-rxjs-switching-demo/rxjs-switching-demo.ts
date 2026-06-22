import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { FlatteningCompare } from './components/flattening-compare/flattening-compare';
import { SWITCHING_ESSENTIALS, SWITCHING_MOMENTS } from './rxjs-switching-info';

@Component({
  selector: 'app-rxjs-switching-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlatteningCompare],
  templateUrl: './rxjs-switching-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RxjsSwitchingDemo {
  protected readonly meta = getCurriculumItem('rxjs-switching')!;
  protected readonly essentials = SWITCHING_ESSENTIALS;
  protected readonly moments = SWITCHING_MOMENTS;
}
