import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConceptsDemo } from './state-concepts-demo';

describe('StateConceptsDemo', () => {
  let component: StateConceptsDemo;
  let fixture: ComponentFixture<StateConceptsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateConceptsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StateConceptsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
