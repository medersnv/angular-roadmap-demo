import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ssr-advanced-demo',
  templateUrl: './ssr-advanced-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SsrAdvancedDemo {
  protected readonly meta = getCurriculumItem('ssr-advanced')!;
}
