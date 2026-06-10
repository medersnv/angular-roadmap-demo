import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateGlobalDemo } from './state-global-demo';

describe('StateGlobalDemo', () => {
  let component: StateGlobalDemo;
  let fixture: ComponentFixture<StateGlobalDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateGlobalDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StateGlobalDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
