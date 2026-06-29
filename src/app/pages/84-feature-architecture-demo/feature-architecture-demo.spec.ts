import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureArchitectureDemo } from './feature-architecture-demo';

describe('FeatureArchitectureDemo', () => {
  let component: FeatureArchitectureDemo;
  let fixture: ComponentFixture<FeatureArchitectureDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureArchitectureDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureArchitectureDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
