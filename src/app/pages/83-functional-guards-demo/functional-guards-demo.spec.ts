import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalGuardsDemo } from './functional-guards-demo';

describe('FunctionalGuardsDemo', () => {
  let component: FunctionalGuardsDemo;
  let fixture: ComponentFixture<FunctionalGuardsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionalGuardsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionalGuardsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
