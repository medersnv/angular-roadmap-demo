import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { InputCompare } from './components/input-compare/input-compare';
import { ModelCompare } from './components/model-compare/model-compare';
import { OutputCompare } from './components/output-compare/output-compare';
import { SIGNALS_COMPONENTS_ESSENTIALS, SIGNALS_COMPONENTS_MOMENTS } from './signals-components-info';

@Component({
  selector: 'app-signals-components-demo',
  imports: [InputCompare, OutputCompare, ModelCompare],
  templateUrl: './signals-components-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class SignalsComponentsDemo {
  protected readonly meta = getCurriculumItem('signals-components')!;
  protected readonly essentials = SIGNALS_COMPONENTS_ESSENTIALS;
  protected readonly moments = SIGNALS_COMPONENTS_MOMENTS;
}
