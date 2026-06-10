import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-security-code-demo',
  templateUrl: './security-code-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SecurityCodeDemo {
  protected readonly meta = getCurriculumItem('security-code')!;
}
