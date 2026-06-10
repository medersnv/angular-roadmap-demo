import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ds-custom-demo',
  templateUrl: './ds-custom-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class DsCustomDemo {
  protected readonly meta = getCurriculumItem('ds-custom')!;
}
