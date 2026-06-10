import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingIntegrationDemo } from './testing-integration-demo';

describe('TestingIntegrationDemo', () => {
  let component: TestingIntegrationDemo;
  let fixture: ComponentFixture<TestingIntegrationDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingIntegrationDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingIntegrationDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
