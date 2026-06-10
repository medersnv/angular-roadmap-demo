import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsAdvancedDemo } from './signals-advanced-demo';

describe('SignalsAdvancedDemo', () => {
  let component: SignalsAdvancedDemo;
  let fixture: ComponentFixture<SignalsAdvancedDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsAdvancedDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsAdvancedDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
