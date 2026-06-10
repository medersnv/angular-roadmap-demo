import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFlowCoreDemo } from './control-flow-core-demo';

describe('ControlFlowCoreDemo', () => {
  let component: ControlFlowCoreDemo;
  let fixture: ComponentFixture<ControlFlowCoreDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlowCoreDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlFlowCoreDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
