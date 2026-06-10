import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-perf-build-demo',
  templateUrl: './perf-build-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class PerfBuildDemo {
  protected readonly meta = getCurriculumItem('perf-build')!;
}
