import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-signals-dom-demo',
  templateUrl: './signals-dom-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SignalsDomDemo {
  protected readonly meta = getCurriculumItem('signals-dom')!;
}
