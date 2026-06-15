import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { ContentchildCompare } from './components/contentchild-compare/contentchild-compare';
import { ViewchildCompare } from './components/viewchild-compare/viewchild-compare';
import { ViewchildrenCompare } from './components/viewchildren-compare/viewchildren-compare';
import { SIGNALS_DOM_ESSENTIALS, SIGNALS_DOM_MOMENTS } from './signals-dom-info';

@Component({
  selector: 'app-signals-dom-demo',
  imports: [ViewchildCompare, ViewchildrenCompare, ContentchildCompare],
  templateUrl: './signals-dom-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class SignalsDomDemo {
  protected readonly meta = getCurriculumItem('signals-dom')!;
  protected readonly essentials = SIGNALS_DOM_ESSENTIALS;
  protected readonly moments = SIGNALS_DOM_MOMENTS;
}
