import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-http-browser-demo',
  templateUrl: './http-browser-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class HttpBrowserDemo {
  protected readonly meta = getCurriculumItem('http-browser')!;
}
