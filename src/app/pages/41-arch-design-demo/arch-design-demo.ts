import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-arch-design-demo',
  templateUrl: './arch-design-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ArchDesignDemo {
  protected readonly meta = getCurriculumItem('arch-design')!;
}
