import { Component, inject } from '@angular/core';
import { ProvidersPlayground } from './components/providers-playground/providers-playground';
import { ProvidersUseClassSwap } from './components/use-class-swap/use-class-swap';
import { PROVIDERS_ESSENTIALS, PROVIDERS_SETUP_CODE, PROVIDER_TYPES } from './providers-info';

@Component({
  selector: 'app-providers-demo',
  imports: [ProvidersPlayground, ProvidersUseClassSwap],
  templateUrl: './providers-demo.html',
  styleUrl: './providers-demo.scss',
})
export class ProvidersDemo {
  protected readonly essentials = PROVIDERS_ESSENTIALS;
  protected readonly providerTypes = PROVIDER_TYPES;
  protected readonly setupCode = PROVIDERS_SETUP_CODE;
}
