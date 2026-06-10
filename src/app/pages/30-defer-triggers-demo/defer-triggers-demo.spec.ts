import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferTriggersDemo } from './defer-triggers-demo';

describe('DeferTriggersDemo', () => {
  let component: DeferTriggersDemo;
  let fixture: ComponentFixture<DeferTriggersDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferTriggersDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferTriggersDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
