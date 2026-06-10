import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-signals-philosophy-demo',
  templateUrl: './signals-philosophy-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SignalsPhilosophyDemo {
  protected readonly meta = getCurriculumItem('signals-philosophy')!;
}
