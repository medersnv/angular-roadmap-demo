import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-signals-components-demo',
  templateUrl: './signals-components-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SignalsComponentsDemo {
  protected readonly meta = getCurriculumItem('signals-components')!;
}
