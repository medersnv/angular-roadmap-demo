import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-testing-runners-demo',
  templateUrl: './testing-runners-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class TestingRunnersDemo {
  protected readonly meta = getCurriculumItem('testing-runners')!;
}
