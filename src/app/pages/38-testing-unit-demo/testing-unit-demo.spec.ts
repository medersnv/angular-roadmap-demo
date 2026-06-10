import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingUnitDemo } from './testing-unit-demo';

describe('TestingUnitDemo', () => {
  let component: TestingUnitDemo;
  let fixture: ComponentFixture<TestingUnitDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingUnitDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingUnitDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
