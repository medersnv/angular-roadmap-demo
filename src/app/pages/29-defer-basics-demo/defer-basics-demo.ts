import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-defer-basics-demo',
  templateUrl: './defer-basics-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class DeferBasicsDemo {
  protected readonly meta = getCurriculumItem('defer-basics')!;
}
