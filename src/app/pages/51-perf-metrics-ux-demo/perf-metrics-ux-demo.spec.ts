import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfMetricsUxDemo } from './perf-metrics-ux-demo';

describe('PerfMetricsUxDemo', () => {
  let component: PerfMetricsUxDemo;
  let fixture: ComponentFixture<PerfMetricsUxDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfMetricsUxDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfMetricsUxDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
