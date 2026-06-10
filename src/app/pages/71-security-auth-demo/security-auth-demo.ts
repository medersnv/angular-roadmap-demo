import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-security-auth-demo',
  templateUrl: './security-auth-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class SecurityAuthDemo {
  protected readonly meta = getCurriculumItem('security-auth')!;
}
