import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPhilosophyDemo } from './signals-philosophy-demo';

describe('SignalsPhilosophyDemo', () => {
  let component: SignalsPhilosophyDemo;
  let fixture: ComponentFixture<SignalsPhilosophyDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsPhilosophyDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsPhilosophyDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
