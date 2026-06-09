import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorsDemo } from './injectors-demo';

describe('InjectorsDemo', () => {
  let component: InjectorsDemo;
  let fixture: ComponentFixture<InjectorsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjectorsDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjectorsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
