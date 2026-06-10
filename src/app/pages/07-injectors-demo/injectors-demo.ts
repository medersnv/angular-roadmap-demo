import { Component } from '@angular/core';
import { InjectorHierarchyParent } from './components/hierarchy-parent/hierarchy-parent';
import { RootScopePanel } from './components/root-scope-panel/root-scope-panel';
import { InjectorTwinA, InjectorTwinB } from './components/twin-parent/twin-parent';
import {
  INJECTORS_COMPARISON,
  INJECTORS_ESSENTIALS,
  INJECTORS_EXAMPLES,
} from './injectors-info';

@Component({
  selector: 'app-injectors-demo',
  imports: [RootScopePanel, InjectorHierarchyParent, InjectorTwinA, InjectorTwinB],
  templateUrl: './injectors-demo.html',
  styleUrl: './injectors-demo.scss',
})
export class InjectorsDemo {
  protected readonly essentials = INJECTORS_ESSENTIALS;
  protected readonly comparison = INJECTORS_COMPARISON;
  protected readonly examples = INJECTORS_EXAMPLES;
}
