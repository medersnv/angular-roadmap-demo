import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-ai-native-dev-demo',
  templateUrl: './ai-native-dev-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class AiNativeDevDemo {
  protected readonly meta = getCurriculumItem('ai-native-dev')!;
}
