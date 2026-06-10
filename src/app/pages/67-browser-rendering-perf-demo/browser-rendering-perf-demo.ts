import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-browser-rendering-perf-demo',
  templateUrl: './browser-rendering-perf-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class BrowserRenderingPerfDemo {
  protected readonly meta = getCurriculumItem('browser-rendering-perf')!;
}
