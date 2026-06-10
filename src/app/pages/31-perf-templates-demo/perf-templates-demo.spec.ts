import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfTemplatesDemo } from './perf-templates-demo';

describe('PerfTemplatesDemo', () => {
  let component: PerfTemplatesDemo;
  let fixture: ComponentFixture<PerfTemplatesDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfTemplatesDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfTemplatesDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
