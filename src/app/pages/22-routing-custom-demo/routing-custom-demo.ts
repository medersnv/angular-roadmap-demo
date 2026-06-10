import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-routing-custom-demo',
  templateUrl: './routing-custom-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RoutingCustomDemo {
  protected readonly meta = getCurriculumItem('routing-custom')!;
}
