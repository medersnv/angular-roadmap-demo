import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchScaleDemo } from './arch-scale-demo';

describe('ArchScaleDemo', () => {
  let component: ArchScaleDemo;
  let fixture: ComponentFixture<ArchScaleDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchScaleDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchScaleDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
