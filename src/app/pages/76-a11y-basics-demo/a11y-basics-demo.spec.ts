import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yBasicsDemo } from './a11y-basics-demo';

describe('A11yBasicsDemo', () => {
  let component: A11yBasicsDemo;
  let fixture: ComponentFixture<A11yBasicsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A11yBasicsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(A11yBasicsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
