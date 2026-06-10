import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ssr-lifecycle-demo',
  templateUrl: './ssr-lifecycle-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SsrLifecycleDemo {
  protected readonly meta = getCurriculumItem('ssr-lifecycle')!;
}
