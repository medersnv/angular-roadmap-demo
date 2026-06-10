import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ds-foundation-demo',
  templateUrl: './ds-foundation-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class DsFoundationDemo {
  protected readonly meta = getCurriculumItem('ds-foundation')!;
}
