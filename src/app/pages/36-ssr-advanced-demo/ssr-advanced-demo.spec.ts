import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrAdvancedDemo } from './ssr-advanced-demo';

describe('SsrAdvancedDemo', () => {
  let component: SsrAdvancedDemo;
  let fixture: ComponentFixture<SsrAdvancedDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrAdvancedDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SsrAdvancedDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
