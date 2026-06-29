import { Component, computed, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { BOOTSTRAP_ESSENTIALS, BOOTSTRAP_MOMENTS, MIGRATION_ROWS } from './bootstrap-application-info';

@Component({
  selector: 'app-bootstrap-application-demo',
  templateUrl: './bootstrap-application-demo.html',
  styleUrls: ['../shared/compare.scss', '../shared/widgets.scss'],
})
export class BootstrapApplicationDemo {
  protected readonly meta = getCurriculumItem('bootstrap-application')!;
  protected readonly essentials = BOOTSTRAP_ESSENTIALS;
  protected readonly moments = BOOTSTRAP_MOMENTS;
  protected readonly rows = MIGRATION_ROWS;

  // --- Интерактив: выбираем строку из AppModule, видим современный эквивалент ---
  protected readonly selectedId = signal(MIGRATION_ROWS[0].id);
  protected readonly selected = computed(
    () => this.rows.find((r) => r.id === this.selectedId()) ?? this.rows[0],
  );
}
