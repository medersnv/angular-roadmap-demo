import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCustomDemo } from './forms-custom-demo';

describe('FormsCustomDemo', () => {
  let component: FormsCustomDemo;
  let fixture: ComponentFixture<FormsCustomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsCustomDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsCustomDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
