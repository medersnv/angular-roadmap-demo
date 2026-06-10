import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-typescript-advanced-demo',
  templateUrl: './typescript-advanced-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class TypescriptAdvancedDemo {
  protected readonly meta = getCurriculumItem('typescript-advanced')!;
}
