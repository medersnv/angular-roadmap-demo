import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-browser-rendering-opt-demo',
  templateUrl: './browser-rendering-opt-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class BrowserRenderingOptDemo {
  protected readonly meta = getCurriculumItem('browser-rendering-opt')!;
}
