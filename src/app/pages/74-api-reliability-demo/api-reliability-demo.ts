import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-api-reliability-demo',
  templateUrl: './api-reliability-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ApiReliabilityDemo {
  protected readonly meta = getCurriculumItem('api-reliability')!;
}
