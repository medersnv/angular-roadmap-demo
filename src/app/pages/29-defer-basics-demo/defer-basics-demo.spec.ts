import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferBasicsDemo } from './defer-basics-demo';

describe('DeferBasicsDemo', () => {
  let component: DeferBasicsDemo;
  let fixture: ComponentFixture<DeferBasicsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferBasicsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferBasicsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
