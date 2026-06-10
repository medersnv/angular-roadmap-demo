import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-routing-ux-demo',
  templateUrl: './routing-ux-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RoutingUxDemo {
  protected readonly meta = getCurriculumItem('routing-ux')!;
}
