import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiReliabilityDemo } from './api-reliability-demo';

describe('ApiReliabilityDemo', () => {
  let component: ApiReliabilityDemo;
  let fixture: ComponentFixture<ApiReliabilityDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiReliabilityDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiReliabilityDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
