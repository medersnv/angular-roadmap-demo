import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { StarRating } from './components/star-rating/star-rating';
import { STANDALONE_COMPONENTS_ESSENTIALS, STANDALONE_COMPONENTS_MOMENTS } from './standalone-components-info';

@Component({
  selector: 'app-standalone-components-demo',
  imports: [StarRating, CurrencyPipe],
  templateUrl: './standalone-components-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class StandaloneComponentsDemo {
  protected readonly meta = getCurriculumItem('standalone-components')!;
  protected readonly essentials = STANDALONE_COMPONENTS_ESSENTIALS;
  protected readonly moments = STANDALONE_COMPONENTS_MOMENTS;

  // --- Живой пример: карточка собрана из standalone-зависимостей ---
  protected readonly rating = signal(4);
  protected readonly price = signal(1990);
  protected readonly summary = computed(() =>
    this.rating() >= 4 ? 'Отличный выбор' : this.rating() >= 2 ? 'Неплохо' : 'На любителя',
  );

  protected setRating(value: number): void {
    this.rating.set(value);
  }
}
