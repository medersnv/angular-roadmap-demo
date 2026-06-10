import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLocalDemo } from './state-local-demo';

describe('StateLocalDemo', () => {
  let component: StateLocalDemo;
  let fixture: ComponentFixture<StateLocalDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateLocalDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StateLocalDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
