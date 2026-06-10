import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-arch-patterns-demo',
  templateUrl: './arch-patterns-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ArchPatternsDemo {
  protected readonly meta = getCurriculumItem('arch-patterns')!;
}
