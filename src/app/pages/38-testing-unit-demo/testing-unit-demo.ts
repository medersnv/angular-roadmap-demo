import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-testing-unit-demo',
  templateUrl: './testing-unit-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class TestingUnitDemo {
  protected readonly meta = getCurriculumItem('testing-unit')!;
}
