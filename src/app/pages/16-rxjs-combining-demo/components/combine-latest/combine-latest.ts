import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductSearchService } from './product-search.service';

/**
 * Живой пример combineLatest: три фильтра — один запрос.
 * Сервис предоставляется на уровне компонента, чтобы у каждого экземпляра демо
 * было своё изолированное состояние.
 */
@Component({
  selector: 'app-combine-latest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductSearchService],
  imports: [AsyncPipe],
  templateUrl: './combine-latest.html',
  styleUrl: '../../../shared/compare.scss',
})
export class CombineLatest {
  // Сервис — единственный источник истины; компонент только проксирует потоки в шаблон.
  protected readonly search = inject(ProductSearchService);

  protected readonly categories = ['phones', 'laptops', 'audio'];
  protected readonly pages = [1, 2, 3];

  protected onTerm(value: string): void {
    this.search.setTerm(value);
  }
}
