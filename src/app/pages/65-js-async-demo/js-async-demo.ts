import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-js-async-demo',
  templateUrl: './js-async-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class JsAsyncDemo {
  protected readonly meta = getCurriculumItem('js-async')!;
}
