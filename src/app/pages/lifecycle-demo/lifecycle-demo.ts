import { Component } from '@angular/core';
import { Child, HookLog } from './components/child/child';
import { LIFECYCLE_HOOKS, CONSTRUCTOR_VS_NGONINIT } from './lifecycle-hooks';

@Component({
  selector: 'app-lifecycle-demo',
  imports: [Child],
  templateUrl: './lifecycle-demo.html',
  styleUrl: './lifecycle-demo.scss',
})
export class LifecycleDemo {
  visible = true;
  user = { name: 'Meder' };
  lastLog: HookLog[] = [];

  protected readonly hooks = LIFECYCLE_HOOKS;
  protected readonly constructorVsNgOnInit = CONSTRUCTOR_VS_NGONINIT;

  changeName(): void {
    this.user.name = 'Алекс';
  }

  replaceUser(): void {
    this.user = { name: 'Нурсултан' };
  }

  destroy(): void {
    this.visible = false;
  }

  recreate(): void {
    this.visible = true;
    this.user = { name: 'Meder' };
    this.lastLog = [];
  }

  onDestroyed(log: HookLog[]): void {
    this.lastLog = log;
  }
}
