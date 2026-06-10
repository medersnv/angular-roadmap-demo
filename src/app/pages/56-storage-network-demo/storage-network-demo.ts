import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';

/** Заглушка — сюда добавляем практические примеры по теме */
@Component({
  selector: 'app-storage-network-demo',
  templateUrl: './storage-network-demo.html',
  styleUrl: '../shared/demo-stub.scss',
})
export class StorageNetworkDemo {
  protected readonly meta = getCurriculumItem('storage-network')!;
}
