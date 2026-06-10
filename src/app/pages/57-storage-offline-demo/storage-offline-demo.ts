import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-offline-demo',
  templateUrl: './storage-offline-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageOfflineDemo {
  protected readonly meta = getCurriculumItem('storage-offline')!;
}
