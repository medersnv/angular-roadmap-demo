import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-js-memory-demo',
  templateUrl: './js-memory-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class JsMemoryDemo {
  protected readonly meta = getCurriculumItem('js-memory')!;
}
