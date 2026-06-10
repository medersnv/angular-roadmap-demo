import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsBasicsDemo } from './js-basics-demo';

describe('JsBasicsDemo', () => {
  let component: JsBasicsDemo;
  let fixture: ComponentFixture<JsBasicsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsBasicsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(JsBasicsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
