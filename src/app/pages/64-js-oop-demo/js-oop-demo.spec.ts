import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsOopDemo } from './js-oop-demo';

describe('JsOopDemo', () => {
  let component: JsOopDemo;
  let fixture: ComponentFixture<JsOopDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsOopDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(JsOopDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
