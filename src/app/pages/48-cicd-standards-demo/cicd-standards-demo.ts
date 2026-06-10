import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-cicd-standards-demo',
  templateUrl: './cicd-standards-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class CicdStandardsDemo {
  protected readonly meta = getCurriculumItem('cicd-standards')!;
}
