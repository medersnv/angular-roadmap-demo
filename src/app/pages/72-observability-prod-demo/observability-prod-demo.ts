import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-observability-prod-demo',
  templateUrl: './observability-prod-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class ObservabilityProdDemo {
  protected readonly meta = getCurriculumItem('observability-prod')!;
}
