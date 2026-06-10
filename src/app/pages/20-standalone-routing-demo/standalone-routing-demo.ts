import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-standalone-routing-demo',
  templateUrl: './standalone-routing-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StandaloneRoutingDemo {
  protected readonly meta = getCurriculumItem('standalone-routing')!;
}
