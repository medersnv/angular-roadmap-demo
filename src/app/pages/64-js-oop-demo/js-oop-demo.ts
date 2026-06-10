import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-js-oop-demo',
  templateUrl: './js-oop-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class JsOopDemo {
  protected readonly meta = getCurriculumItem('js-oop')!;
}
