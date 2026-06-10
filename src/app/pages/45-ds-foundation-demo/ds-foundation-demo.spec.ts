import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsFoundationDemo } from './ds-foundation-demo';

describe('DsFoundationDemo', () => {
  let component: DsFoundationDemo;
  let fixture: ComponentFixture<DsFoundationDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFoundationDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFoundationDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
