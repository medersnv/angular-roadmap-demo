import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-signals-advanced-demo',
  templateUrl: './signals-advanced-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SignalsAdvancedDemo {
  protected readonly meta = getCurriculumItem('signals-advanced')!;
}
