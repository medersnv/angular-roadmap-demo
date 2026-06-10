import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-state-global-demo',
  templateUrl: './state-global-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StateGlobalDemo {
  protected readonly meta = getCurriculumItem('state-global')!;
}
