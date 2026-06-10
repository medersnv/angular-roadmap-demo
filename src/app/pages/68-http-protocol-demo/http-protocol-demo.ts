import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-http-protocol-demo',
  templateUrl: './http-protocol-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class HttpProtocolDemo {
  protected readonly meta = getCurriculumItem('http-protocol')!;
}
