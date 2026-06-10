import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsTheoryDemo } from './rxjs-theory-demo';

describe('RxjsTheoryDemo', () => {
  let component: RxjsTheoryDemo;
  let fixture: ComponentFixture<RxjsTheoryDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsTheoryDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsTheoryDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
