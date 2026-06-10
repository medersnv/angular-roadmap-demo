import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-forms-custom-demo',
  templateUrl: './forms-custom-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class FormsCustomDemo {
  protected readonly meta = getCurriculumItem('forms-custom')!;
}
