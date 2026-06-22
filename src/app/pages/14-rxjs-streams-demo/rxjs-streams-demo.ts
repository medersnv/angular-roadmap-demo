import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { ColdHot } from './components/cold-hot/cold-hot';
import { ReplayCompare } from './components/replay-compare/replay-compare';
import { SubjectsZoo } from './components/subjects-zoo/subjects-zoo';
import { STREAMS_ESSENTIALS, STREAMS_MOMENTS } from './rxjs-streams-info';

@Component({
  selector: 'app-rxjs-streams-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SubjectsZoo, ColdHot, ReplayCompare],
  templateUrl: './rxjs-streams-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RxjsStreamsDemo {
  protected readonly meta = getCurriculumItem('rxjs-streams')!;
  protected readonly essentials = STREAMS_ESSENTIALS;
  protected readonly moments = STREAMS_MOMENTS;
}
