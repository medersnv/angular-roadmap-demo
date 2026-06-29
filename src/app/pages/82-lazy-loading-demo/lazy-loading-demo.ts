import { Component, OnDestroy, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { LAZY_ESSENTIALS, LAZY_MOMENTS } from './lazy-loading-info';

interface LazyRoute {
  path: string;
  title: string;
  kind: 'loadComponent' | 'loadChildren';
  size: string;
}

@Component({
  selector: 'app-lazy-loading-demo',
  templateUrl: './lazy-loading-demo.html',
  styleUrls: ['../shared/compare.scss', '../shared/widgets.scss'],
})
export class LazyLoadingDemo implements OnDestroy {
  protected readonly meta = getCurriculumItem('lazy-loading')!;
  protected readonly essentials = LAZY_ESSENTIALS;
  protected readonly moments = LAZY_MOMENTS;

  protected readonly routes: LazyRoute[] = [
    { path: 'dashboard', title: 'Dashboard', kind: 'loadComponent', size: '24 KB' },
    { path: 'reports', title: 'Reports', kind: 'loadChildren', size: '41 KB' },
    { path: 'settings', title: 'Settings', kind: 'loadComponent', size: '12 KB' },
  ];

  protected readonly current = signal<string | null>(null);
  protected readonly loadingPath = signal<string | null>(null);
  protected readonly loaded = signal<ReadonlySet<string>>(new Set());
  protected readonly log = signal<string[]>(['Старт: загружен только корневой бандл']);

  private timer: ReturnType<typeof setTimeout> | null = null;

  protected navigate(route: LazyRoute): void {
    if (this.loadingPath()) {
      return;
    }

    if (this.loaded().has(route.path)) {
      this.current.set(route.path);
      this.addLog(`/${route.path}: чанк уже в кэше → переход мгновенный`);
      return;
    }

    this.loadingPath.set(route.path);
    this.addLog(`/${route.path}: запрос чанка (${route.kind}, ${route.size})…`);

    this.timer = setTimeout(() => {
      this.loaded.update((set) => new Set(set).add(route.path));
      this.loadingPath.set(null);
      this.current.set(route.path);
      this.addLog(`/${route.path}: чанк загружен и выполнен ✓`);
    }, 750);
  }

  protected reset(): void {
    this.clearTimer();
    this.loadingPath.set(null);
    this.current.set(null);
    this.loaded.set(new Set());
    this.log.set(['Сброс: снова только корневой бандл']);
  }

  protected isLoaded(path: string): boolean {
    return this.loaded().has(path);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private addLog(line: string): void {
    this.log.update((lines) => [...lines, line].slice(-7));
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
