import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-js-basics-demo',
  templateUrl: './js-basics-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class JsBasicsDemo {
  protected readonly meta = getCurriculumItem('js-basics')!;
}
