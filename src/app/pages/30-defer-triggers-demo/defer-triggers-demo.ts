import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-defer-triggers-demo',
  templateUrl: './defer-triggers-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class DeferTriggersDemo {
  protected readonly meta = getCurriculumItem('defer-triggers')!;
}
