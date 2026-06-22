import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { LeakLab } from './components/leak-lab/leak-lab';
import { LEAK_ESSENTIALS, LEAK_MOMENTS } from './rxjs-memory-leaks-info';

@Component({
  selector: 'app-rxjs-memory-leaks-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeakLab],
  templateUrl: './rxjs-memory-leaks-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RxjsMemoryLeaksDemo {
  protected readonly meta = getCurriculumItem('rxjs-memory-leaks')!;
  protected readonly essentials = LEAK_ESSENTIALS;
  protected readonly moments = LEAK_MOMENTS;
}
