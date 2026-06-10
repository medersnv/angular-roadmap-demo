import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-security-tools-demo',
  templateUrl: './storage-security-tools-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageSecurityToolsDemo {
  protected readonly meta = getCurriculumItem('storage-security-tools')!;
}
