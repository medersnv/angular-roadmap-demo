import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { LinkedPrev } from './components/linked-prev/linked-prev';
import { LinkedReset } from './components/linked-reset/linked-reset';
import { ResourceStatus } from './components/resource-status/resource-status';
import { RxResource } from './components/rx-resource/rx-resource';
import { RxjsInterop } from './components/rxjs-interop/rxjs-interop';
import { SignalStore } from './components/signal-store/signal-store';
import { SIGNALS_ADVANCED_ESSENTIALS, SIGNALS_ADVANCED_MOMENTS } from './signals-advanced-info';

@Component({
  selector: 'app-signals-advanced-demo',
  imports: [LinkedReset, LinkedPrev, ResourceStatus, RxjsInterop, RxResource, SignalStore],
  templateUrl: './signals-advanced-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class SignalsAdvancedDemo {
  protected readonly meta = getCurriculumItem('signals-advanced')!;
  protected readonly essentials = SIGNALS_ADVANCED_ESSENTIALS;
  protected readonly moments = SIGNALS_ADVANCED_MOMENTS;
}
