import { Component, EnvironmentInjector, inject, OnInit, runInInjectionContext } from '@angular/core';
import { AuthService } from '../../services/demo-services';

/** Functional guard — inject() внутри функции. */
export function demoAuthGuard(): boolean {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
}

@Component({
  selector: 'app-functional-panel',
  templateUrl: './functional-panel.html',
  styleUrl: '../constructor-panel/panel.scss',
})
export class FunctionalPanel implements OnInit {
  protected guardResult = '—';
  protected authStatus = '—';

  private readonly auth = inject(AuthService);
  private readonly injector = inject(EnvironmentInjector);

  ngOnInit(): void {
    this.authStatus = this.auth.status();
  }

  runGuard(): void {
    const allowed = runInInjectionContext(this.injector, () => demoAuthGuard());
    this.guardResult = allowed ? 'guard: доступ разрешён' : 'guard: доступ запрещён';
    this.authStatus = this.auth.status();
  }

  toggleAuth(): void {
    this.auth.toggle();
    this.authStatus = this.auth.status();
  }
}
