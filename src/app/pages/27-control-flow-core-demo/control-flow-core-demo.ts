import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-control-flow-core-demo',
  templateUrl: './control-flow-core-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ControlFlowCoreDemo {
  protected readonly meta = getCurriculumItem('control-flow-core')!;
}
