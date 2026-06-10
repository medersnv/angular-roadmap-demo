import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFlowAdvancedDemo } from './control-flow-advanced-demo';

describe('ControlFlowAdvancedDemo', () => {
  let component: ControlFlowAdvancedDemo;
  let fixture: ComponentFixture<ControlFlowAdvancedDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlowAdvancedDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlFlowAdvancedDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
