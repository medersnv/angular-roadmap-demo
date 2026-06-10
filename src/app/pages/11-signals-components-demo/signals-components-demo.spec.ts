import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsComponentsDemo } from './signals-components-demo';

describe('SignalsComponentsDemo', () => {
  let component: SignalsComponentsDemo;
  let fixture: ComponentFixture<SignalsComponentsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsComponentsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsComponentsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
