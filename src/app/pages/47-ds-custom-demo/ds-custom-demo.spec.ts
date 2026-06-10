import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCustomDemo } from './ds-custom-demo';

describe('DsCustomDemo', () => {
  let component: DsCustomDemo;
  let fixture: ComponentFixture<DsCustomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCustomDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCustomDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
