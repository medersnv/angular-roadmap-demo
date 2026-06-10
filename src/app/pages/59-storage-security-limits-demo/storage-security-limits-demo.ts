import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-security-limits-demo',
  templateUrl: './storage-security-limits-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageSecurityLimitsDemo {
  protected readonly meta = getCurriculumItem('storage-security-limits')!;
}
