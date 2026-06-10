import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-perf-metrics-monitoring-demo',
  templateUrl: './perf-metrics-monitoring-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class PerfMetricsMonitoringDemo {
  protected readonly meta = getCurriculumItem('perf-metrics-monitoring')!;
}
