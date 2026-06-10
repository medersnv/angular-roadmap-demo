import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-rxjs-theory-demo',
  templateUrl: './rxjs-theory-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RxjsTheoryDemo {
  protected readonly meta = getCurriculumItem('rxjs-theory')!;
}
