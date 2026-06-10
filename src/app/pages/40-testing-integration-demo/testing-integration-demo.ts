import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-testing-integration-demo',
  templateUrl: './testing-integration-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class TestingIntegrationDemo {
  protected readonly meta = getCurriculumItem('testing-integration')!;
}
