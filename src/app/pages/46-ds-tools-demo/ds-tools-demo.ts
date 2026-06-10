import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ds-tools-demo',
  templateUrl: './ds-tools-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class DsToolsDemo {
  protected readonly meta = getCurriculumItem('ds-tools')!;
}
