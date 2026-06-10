import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-standalone-components-demo',
  templateUrl: './standalone-components-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StandaloneComponentsDemo {
  protected readonly meta = getCurriculumItem('standalone-components')!;
}
