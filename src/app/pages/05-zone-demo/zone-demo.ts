import { Component } from '@angular/core';
import { ZoneInsideTimer } from './components/inside-zone-timer/inside-zone-timer';
import { ZoneOutsideTimer } from './components/outside-zone-timer/outside-zone-timer';
import { ZoneRunFix } from './components/zone-run-fix/zone-run-fix';
import { ZoneVsZoneless } from './components/zone-vs-zoneless/zone-vs-zoneless';
import { ZONE_API, ZONE_BOOTSTRAP_CODE, ZONE_ESSENTIALS, ZONE_EXAMPLES } from './zone-info';

@Component({
  selector: 'app-zone-demo',
  imports: [ZoneVsZoneless, ZoneInsideTimer, ZoneOutsideTimer, ZoneRunFix],
  templateUrl: './zone-demo.html',
  styleUrl: './zone-demo.scss',
})
export class ZoneDemo {
  protected readonly essentials = ZONE_ESSENTIALS;
  protected readonly api = ZONE_API;
  protected readonly examples = ZONE_EXAMPLES;
  protected readonly bootstrapCode = ZONE_BOOTSTRAP_CODE;
}
