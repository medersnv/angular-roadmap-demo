import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserRenderingOptDemo } from './browser-rendering-opt-demo';

describe('BrowserRenderingOptDemo', () => {
  let component: BrowserRenderingOptDemo;
  let fixture: ComponentFixture<BrowserRenderingOptDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserRenderingOptDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserRenderingOptDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
