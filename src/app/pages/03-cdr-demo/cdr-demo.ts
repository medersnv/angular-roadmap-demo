import { Component } from '@angular/core';
import { CdrGiantList } from './components/giant-list/giant-list';
import { CdrLiveDataDemo } from './components/live-data/live-data-demo';
import { CdrMarkForCheckTicks } from './components/mark-for-check-ticks/mark-for-check-ticks';
import { CDR_ESSENTIALS, CDR_EXAMPLES, CDR_METHODS } from './cdr-info';

@Component({
  selector: 'app-cdr-demo',
  imports: [CdrMarkForCheckTicks, CdrGiantList, CdrLiveDataDemo],
  templateUrl: './cdr-demo.html',
  styleUrl: './cdr-demo.scss',
})
export class CdrDemo {
  protected readonly essentials = CDR_ESSENTIALS;
  protected readonly methods = CDR_METHODS;
  protected readonly examples = CDR_EXAMPLES;
}
