import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsMemoryDemo } from './js-memory-demo';

describe('JsMemoryDemo', () => {
  let component: JsMemoryDemo;
  let fixture: ComponentFixture<JsMemoryDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsMemoryDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(JsMemoryDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
