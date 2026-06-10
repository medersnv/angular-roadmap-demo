import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-routing-guards-data-demo',
  templateUrl: './routing-guards-data-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RoutingGuardsDataDemo {
  protected readonly meta = getCurriculumItem('routing-guards-data')!;
}
