import {
  afterEveryRender,
  afterNextRender,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';

export interface HookLog {
  hook: string;
  info: string;
}

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() user = { name: 'Meder' };

  readonly destroyed = output<HookLog[]>();

  log: HookLog[] = [];

  private doCheckLogged = false;
  private contentCheckedLogged = false;
  private viewCheckedLogged = false;

  constructor() {
    this.add('constructor');

    afterNextRender(() => this.add('afterNextRender'));
    afterEveryRender(() => console.log('Child: afterEveryRender'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['user'];
    const info = change
      ? `${change.previousValue?.name ?? 'undefined'} → ${change.currentValue?.name}`
      : '';
    this.add('ngOnChanges', info);
  }

  ngOnInit(): void {
    this.add('ngOnInit', `user.name = ${this.user.name}`);
  }

  ngDoCheck(): void {
    if (!this.doCheckLogged) {
      console.log('Child: ngDoCheck (вызывается при каждой проверке изменений)');
      this.doCheckLogged = true;
    }
  }

  ngAfterContentInit(): void {
    this.add('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    if (!this.contentCheckedLogged) {
      console.log('Child: ngAfterContentChecked (вызывается при каждой проверке контента)');
      this.contentCheckedLogged = true;
    }
  }

  ngAfterViewInit(): void {
    this.add('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    if (!this.viewCheckedLogged) {
      console.log('Child: ngAfterViewChecked (вызывается при каждой проверке шаблона)');
      this.viewCheckedLogged = true;
    }
  }

  ngOnDestroy(): void {
    this.add('ngOnDestroy');
    this.destroyed.emit([...this.log]);
  }

  private add(hook: string, info = ''): void {
    queueMicrotask(() => this.log.push({ hook, info }));
    console.log(`Child: ${hook}`, info);
  }
}
