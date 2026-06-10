import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-arch-scale-demo',
  templateUrl: './arch-scale-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ArchScaleDemo {
  protected readonly meta = getCurriculumItem('arch-scale')!;
}
