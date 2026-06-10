import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-rxjs-streams-demo',
  templateUrl: './rxjs-streams-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RxjsStreamsDemo {
  protected readonly meta = getCurriculumItem('rxjs-streams')!;
}
