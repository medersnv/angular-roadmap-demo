import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-perf-metrics-ux-demo',
  templateUrl: './perf-metrics-ux-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class PerfMetricsUxDemo {
  protected readonly meta = getCurriculumItem('perf-metrics-ux')!;
}
