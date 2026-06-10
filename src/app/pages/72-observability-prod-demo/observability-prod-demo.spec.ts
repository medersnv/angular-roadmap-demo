import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservabilityProdDemo } from './observability-prod-demo';

describe('ObservabilityProdDemo', () => {
  let component: ObservabilityProdDemo;
  let fixture: ComponentFixture<ObservabilityProdDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservabilityProdDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservabilityProdDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
