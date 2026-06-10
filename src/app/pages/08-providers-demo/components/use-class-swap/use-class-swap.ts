import { Component, inject } from '@angular/core';
import { FileLogger, LOGGER } from '../../tokens';

/** Тот же token LOGGER, но useClass: FileLogger — другая реализация. */
@Component({
  selector: 'app-providers-use-class-swap',
  providers: [{ provide: LOGGER, useClass: FileLogger }],
  templateUrl: './use-class-swap.html',
  styleUrl: './use-class-swap.scss',
})
export class ProvidersUseClassSwap {
  private readonly logger = inject(LOGGER);

  protected result = '—';

  log(): void {
    this.result = this.logger.log('Swapped implementation');
  }
}
