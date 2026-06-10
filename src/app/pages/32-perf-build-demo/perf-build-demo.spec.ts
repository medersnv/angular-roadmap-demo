import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfBuildDemo } from './perf-build-demo';

describe('PerfBuildDemo', () => {
  let component: PerfBuildDemo;
  let fixture: ComponentFixture<PerfBuildDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfBuildDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfBuildDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
