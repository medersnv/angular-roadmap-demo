import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-state-local-demo',
  templateUrl: './state-local-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StateLocalDemo {
  protected readonly meta = getCurriculumItem('state-local')!;
}
