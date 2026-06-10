import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReactiveDemo } from './forms-reactive-demo';

describe('FormsReactiveDemo', () => {
  let component: FormsReactiveDemo;
  let fixture: ComponentFixture<FormsReactiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsReactiveDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsReactiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
