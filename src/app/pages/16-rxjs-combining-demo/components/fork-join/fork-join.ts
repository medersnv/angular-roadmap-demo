import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AppConfigService } from './app-config.service';

/** Живой пример forkJoin: параллельная загрузка нескольких файлов конфигурации. */
@Component({
  selector: 'app-fork-join',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppConfigService],
  imports: [AsyncPipe],
  templateUrl: './fork-join.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ForkJoin {
  protected readonly configService = inject(AppConfigService);
}
