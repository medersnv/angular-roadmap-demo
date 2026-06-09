import { Component } from '@angular/core';
import { ZoneVsZoneless } from '../zone-demo/components/zone-vs-zoneless/zone-vs-zoneless';
import { ZonelessAsyncMessage } from './components/async-message/async-message';
import { ZonelessMarkForCheckFix } from './components/mark-for-check-fix/mark-for-check-fix';
import { ZonelessNoTrigger } from './components/no-trigger/no-trigger';
import { ZonelessSignalCounter } from './components/signal-counter/signal-counter';
import {
  ZONELESS_BOOTSTRAP_CODE,
  ZONELESS_ESSENTIALS,
  ZONELESS_EXAMPLES,
  ZONELESS_TRIGGERS,
} from './zoneless-info';

@Component({
  selector: 'app-zoneless-demo',
  imports: [
    ZoneVsZoneless,
    ZonelessSignalCounter,
    ZonelessAsyncMessage,
    ZonelessNoTrigger,
    ZonelessMarkForCheckFix,
  ],
  templateUrl: './zoneless-demo.html',
  styleUrl: './zoneless-demo.scss',
})
export class ZonelessDemo {
  protected readonly essentials = ZONELESS_ESSENTIALS;
  protected readonly triggers = ZONELESS_TRIGGERS;
  protected readonly examples = ZONELESS_EXAMPLES;
  protected readonly bootstrapCode = ZONELESS_BOOTSTRAP_CODE;
}
