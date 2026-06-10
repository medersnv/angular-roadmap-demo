import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-sync-demo',
  templateUrl: './storage-sync-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageSyncDemo {
  protected readonly meta = getCurriculumItem('storage-sync')!;
}
