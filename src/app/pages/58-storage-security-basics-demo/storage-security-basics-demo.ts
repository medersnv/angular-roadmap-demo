import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-security-basics-demo',
  templateUrl: './storage-security-basics-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageSecurityBasicsDemo {
  protected readonly meta = getCurriculumItem('storage-security-basics')!;
}
