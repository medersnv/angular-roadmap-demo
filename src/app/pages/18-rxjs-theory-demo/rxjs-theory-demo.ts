import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { PullPush } from './components/pull-push/pull-push';
import { Schedulers } from './components/schedulers/schedulers';
import { THEORY_ESSENTIALS, THEORY_MOMENTS } from './rxjs-theory-info';

@Component({
  selector: 'app-rxjs-theory-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PullPush, Schedulers],
  templateUrl: './rxjs-theory-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RxjsTheoryDemo {
  protected readonly meta = getCurriculumItem('rxjs-theory')!;
  protected readonly essentials = THEORY_ESSENTIALS;
  protected readonly moments = THEORY_MOMENTS;
}
