import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsMemoryLeaksDemo } from './rxjs-memory-leaks-demo';

describe('RxjsMemoryLeaksDemo', () => {
  let component: RxjsMemoryLeaksDemo;
  let fixture: ComponentFixture<RxjsMemoryLeaksDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsMemoryLeaksDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsMemoryLeaksDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
