import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-perf-templates-demo',
  templateUrl: './perf-templates-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class PerfTemplatesDemo {
  protected readonly meta = getCurriculumItem('perf-templates')!;
}
