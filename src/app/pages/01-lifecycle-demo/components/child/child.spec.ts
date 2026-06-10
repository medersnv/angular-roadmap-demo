import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';

import { Child } from './child';

describe('Child', () => {
  let fixture: ComponentFixture<Child>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Child],
    }).compileComponents();

    fixture = TestBed.createComponent(Child);
    fixture.componentInstance.user = { name: 'Test' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should log main lifecycle hooks', fakeAsync(() => {
    flushMicrotasks();
    const hooks = fixture.componentInstance.log.map(entry => entry.hook);
    expect(hooks).toContain('constructor');
    expect(hooks).toContain('ngOnInit');
    expect(hooks).toContain('ngAfterViewInit');
  }));
});
