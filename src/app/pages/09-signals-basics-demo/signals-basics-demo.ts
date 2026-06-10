import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-signals-basics-demo',
  templateUrl: './signals-basics-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SignalsBasicsDemo {
  protected readonly meta = getCurriculumItem('signals-basics')!;
}
