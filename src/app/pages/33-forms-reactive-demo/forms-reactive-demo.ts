import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-forms-reactive-demo',
  templateUrl: './forms-reactive-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class FormsReactiveDemo {
  protected readonly meta = getCurriculumItem('forms-reactive')!;
}
