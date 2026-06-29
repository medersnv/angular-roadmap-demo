import { Component, computed, input, output, signal } from '@angular/core';

/**
 * Маленький standalone-компонент: никаких NgModule.
 * Демонстрирует, что его можно импортировать напрямую в imports родителя.
 */
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.html',
  styleUrls: ['../../../shared/compare.scss', '../../../shared/widgets.scss'],
})
export class StarRating {
  /** signal-input: внешнее стартовое значение */
  readonly value = input(0);
  /** событие наружу при выборе */
  readonly rated = output<number>();

  protected readonly hovered = signal(0);
  /** что подсветить: ховер важнее текущего значения */
  protected readonly shown = computed(() => this.hovered() || this.value());
  protected readonly stars = [1, 2, 3, 4, 5];

  protected pick(n: number): void {
    this.rated.emit(n);
  }
}
