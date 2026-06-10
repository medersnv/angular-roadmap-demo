import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-libraries-demo',
  templateUrl: './storage-libraries-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageLibrariesDemo {
  protected readonly meta = getCurriculumItem('storage-libraries')!;
}
