import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsToolsDemo } from './ds-tools-demo';

describe('DsToolsDemo', () => {
  let component: DsToolsDemo;
  let fixture: ComponentFixture<DsToolsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsToolsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(DsToolsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
