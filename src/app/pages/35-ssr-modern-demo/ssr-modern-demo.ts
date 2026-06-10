import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ssr-modern-demo',
  templateUrl: './ssr-modern-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SsrModernDemo {
  protected readonly meta = getCurriculumItem('ssr-modern')!;
}
