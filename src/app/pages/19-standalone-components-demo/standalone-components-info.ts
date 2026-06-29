export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const STANDALONE_COMPONENTS_ESSENTIALS = [
  'Standalone-компонент сам объявляет свои зависимости в imports: [] — отдельный @NgModule больше не нужен.',
  'С Angular v17 флаг standalone: true стоит по умолчанию — его даже не пишут.',
  'Зависимости видны прямо в компоненте → лучше tree-shaking: в бандл попадёт только то, что реально импортировано.',
  'Переиспользование = обычный import класса. Никаких declarations/exports и «модулей-посредников».',
];

export const STANDALONE_COMPONENTS_MOMENTS: CompareMoment[] = [
  {
    id: 'declare',
    title: '1. Объявление: declarations → imports',
    desc: 'Раньше компонент «существовал» только если был перечислен в declarations какого-то модуля, а модуль — где-то подключён. Теперь компонент самодостаточен: его зависимости лежат в его же imports.',
    beforeCode: `// Раньше: компонент + отдельный модуль-обёртка
@Component({ selector: 'app-card', /* ... */ })
export class CardComponent {}

@NgModule({
  declarations: [CardComponent],   // объявили
  imports: [CommonModule],
  exports: [CardComponent],        // не забыть отдать наружу
})
export class CardModule {}`,
    afterCode: `// Сейчас: всё в одном @Component
@Component({
  selector: 'app-card',
  imports: [StarRating, CurrencyPipe], // зависимости видны тут
  templateUrl: './card.html',
})
export class Card {}
// standalone: true подразумевается — писать не нужно`,
    note: 'Модуль CardModule был чистым «посредником»: объявить + экспортировать. Standalone убирает этот слой целиком.',
  },
  {
    id: 'imports',
    title: '2. Только нужное: CommonModule → точечные импорты',
    desc: 'Раньше ради *ngIf/*ngFor подключали весь CommonModule. В standalone импортируешь ровно то, что используешь, а структурные директивы вообще заменены встроенным @if/@for — их импортировать не надо.',
    beforeCode: `@NgModule({
  declarations: [ProductList],
  imports: [
    CommonModule,   // тащим всё ради *ngIf/*ngFor
    RouterModule,
  ],
})
export class ProductModule {}`,
    afterCode: `@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe], // точечно
  template: \`
    @for (p of products(); track p.id) {
      <a [routerLink]="p.id">{{ p.price | currency }}</a>
    }
  \`,
})
export class ProductList {}`,
    note: '@if / @for / @switch встроены в компилятор шаблонов — это не директивы, импорт не нужен. Бандл меньше, дерево зависимостей честнее.',
  },
  {
    id: 'reuse',
    title: '3. Переиспользование: exports → обычный import',
    desc: 'Чтобы отдать компонент в другой модуль, раньше его экспортировали из NgModule и импортировали этот модуль. Теперь — просто импортируешь сам класс компонента туда, где он нужен.',
    beforeCode: `// Хочешь StarRating в другом модуле?
@NgModule({
  declarations: [StarRating],
  exports: [StarRating],     // отдать наружу
})
export class SharedModule {}

@NgModule({ imports: [SharedModule] }) // подключить модуль
export class CatalogModule {}`,
    afterCode: `// Просто импортируй компонент туда, где нужен
@Component({
  selector: 'app-catalog',
  imports: [StarRating],   // и всё
  template: '<app-star-rating [value]="4" />',
})
export class Catalog {}`,
    note: 'Граф зависимостей строится из реальных import’ов между компонентами, а не из ручных деклараций в модулях. Меньше «магии», проще навигация по коду.',
  },
];
