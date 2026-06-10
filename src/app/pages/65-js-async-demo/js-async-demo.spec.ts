import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAsyncDemo } from './js-async-demo';

describe('JsAsyncDemo', () => {
  let component: JsAsyncDemo;
  let fixture: ComponentFixture<JsAsyncDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsAsyncDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(JsAsyncDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
