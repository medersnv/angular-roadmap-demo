import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfMetricsMonitoringDemo } from './perf-metrics-monitoring-demo';

describe('PerfMetricsMonitoringDemo', () => {
  let component: PerfMetricsMonitoringDemo;
  let fixture: ComponentFixture<PerfMetricsMonitoringDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfMetricsMonitoringDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfMetricsMonitoringDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
