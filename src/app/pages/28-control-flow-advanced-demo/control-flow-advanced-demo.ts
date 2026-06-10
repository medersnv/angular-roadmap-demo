import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-control-flow-advanced-demo',
  templateUrl: './control-flow-advanced-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ControlFlowAdvancedDemo {
  protected readonly meta = getCurriculumItem('control-flow-advanced')!;
}
