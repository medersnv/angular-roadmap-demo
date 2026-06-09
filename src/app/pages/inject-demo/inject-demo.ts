import { Component } from '@angular/core';
import { ConstructorPanel } from './components/constructor-panel/constructor-panel';
import { FunctionalPanel } from './components/functional-panel/functional-panel';
import { InjectFieldPanel } from './components/inject-field-panel/inject-field-panel';
import { INJECT_COMPARISON, INJECT_ESSENTIALS, INJECT_EXAMPLES } from './inject-info';

@Component({
  selector: 'app-inject-demo',
  imports: [ConstructorPanel, InjectFieldPanel, FunctionalPanel],
  templateUrl: './inject-demo.html',
  styleUrl: './inject-demo.scss',
})
export class InjectDemo {
  protected readonly essentials = INJECT_ESSENTIALS;
  protected readonly comparison = INJECT_COMPARISON;
  protected readonly examples = INJECT_EXAMPLES;
}
