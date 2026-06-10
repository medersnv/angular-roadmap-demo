import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-a11y-basics-demo',
  templateUrl: './a11y-basics-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class A11yBasicsDemo {
  protected readonly meta = getCurriculumItem('a11y-basics')!;
}
