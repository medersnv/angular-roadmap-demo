import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrModernDemo } from './ssr-modern-demo';

describe('SsrModernDemo', () => {
  let component: SsrModernDemo;
  let fixture: ComponentFixture<SsrModernDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrModernDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SsrModernDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
