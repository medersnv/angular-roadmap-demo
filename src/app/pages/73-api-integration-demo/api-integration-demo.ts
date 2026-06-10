import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-api-integration-demo',
  templateUrl: './api-integration-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ApiIntegrationDemo {
  protected readonly meta = getCurriculumItem('api-integration')!;
}
