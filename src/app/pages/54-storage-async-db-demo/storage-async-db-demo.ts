import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-async-db-demo',
  templateUrl: './storage-async-db-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageAsyncDbDemo {
  protected readonly meta = getCurriculumItem('storage-async-db')!;
}
