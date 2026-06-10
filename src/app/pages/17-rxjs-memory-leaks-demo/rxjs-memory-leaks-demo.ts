import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-rxjs-memory-leaks-demo',
  templateUrl: './rxjs-memory-leaks-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class RxjsMemoryLeaksDemo {
  protected readonly meta = getCurriculumItem('rxjs-memory-leaks')!;
}
