import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-rxjs-combining-demo',
  templateUrl: './rxjs-combining-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RxjsCombiningDemo {
  protected readonly meta = getCurriculumItem('rxjs-combining')!;
}
