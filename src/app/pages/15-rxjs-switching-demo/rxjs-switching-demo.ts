import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-rxjs-switching-demo',
  templateUrl: './rxjs-switching-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RxjsSwitchingDemo {
  protected readonly meta = getCurriculumItem('rxjs-switching')!;
}
