import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrLifecycleDemo } from './ssr-lifecycle-demo';

describe('SsrLifecycleDemo', () => {
  let component: SsrLifecycleDemo;
  let fixture: ComponentFixture<SsrLifecycleDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrLifecycleDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SsrLifecycleDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
