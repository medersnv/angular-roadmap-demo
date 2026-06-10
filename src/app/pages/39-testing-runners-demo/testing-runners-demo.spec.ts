import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingRunnersDemo } from './testing-runners-demo';

describe('TestingRunnersDemo', () => {
  let component: TestingRunnersDemo;
  let fixture: ComponentFixture<TestingRunnersDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingRunnersDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingRunnersDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
