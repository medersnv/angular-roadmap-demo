import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-arch-relations-demo',
  templateUrl: './arch-relations-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ArchRelationsDemo {
  protected readonly meta = getCurriculumItem('arch-relations')!;
}
