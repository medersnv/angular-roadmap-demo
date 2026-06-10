import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-cicd-api-demo',
  templateUrl: './cicd-api-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class CicdApiDemo {
  protected readonly meta = getCurriculumItem('cicd-api')!;
}
