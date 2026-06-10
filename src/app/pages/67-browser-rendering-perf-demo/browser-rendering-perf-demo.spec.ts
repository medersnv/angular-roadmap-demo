import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserRenderingPerfDemo } from './browser-rendering-perf-demo';

describe('BrowserRenderingPerfDemo', () => {
  let component: BrowserRenderingPerfDemo;
  let fixture: ComponentFixture<BrowserRenderingPerfDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserRenderingPerfDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserRenderingPerfDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
