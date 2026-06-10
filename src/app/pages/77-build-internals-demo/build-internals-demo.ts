import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-build-internals-demo',
  templateUrl: './build-internals-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class BuildInternalsDemo {
  protected readonly meta = getCurriculumItem('build-internals')!;
}
