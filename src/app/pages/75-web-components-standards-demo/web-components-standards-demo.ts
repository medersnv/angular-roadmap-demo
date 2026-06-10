import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-web-components-standards-demo',
  templateUrl: './web-components-standards-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class WebComponentsStandardsDemo {
  protected readonly meta = getCurriculumItem('web-components-standards')!;
}
