import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { CdVisualizer } from './components/cd-visualizer/cd-visualizer';
import { DerivedCompare } from './components/derived-compare/derived-compare';
import { FormsCompare } from './components/forms-compare/forms-compare';
import { ValidationCompare } from './components/validation-compare/validation-compare';
import {
  CROSS_FRAMEWORK,
  SIGNAL_FORMS_PREVIEW,
  SIGNALS_PHILOSOPHY_ESSENTIALS,
  SIGNALS_PHILOSOPHY_MOMENTS,
  SIGNALS_VS_RXJS,
} from './signals-philosophy-info';

@Component({
  selector: 'app-signals-philosophy-demo',
  imports: [DerivedCompare, FormsCompare, CdVisualizer, ValidationCompare],
  templateUrl: './signals-philosophy-demo.html',
  styleUrls: ['./signals-philosophy-demo.scss', '../shared/compare.scss'],
})
export class SignalsPhilosophyDemo {
  protected readonly meta = getCurriculumItem('signals-philosophy')!;
  protected readonly essentials = SIGNALS_PHILOSOPHY_ESSENTIALS;
  protected readonly mentalModel = SIGNALS_VS_RXJS;
  protected readonly moments = SIGNALS_PHILOSOPHY_MOMENTS;
  protected readonly signalForms = SIGNAL_FORMS_PREVIEW;
  protected readonly frameworks = CROSS_FRAMEWORK;
}
