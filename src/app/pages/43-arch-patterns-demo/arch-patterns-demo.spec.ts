import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchPatternsDemo } from './arch-patterns-demo';

describe('ArchPatternsDemo', () => {
  let component: ArchPatternsDemo;
  let fixture: ComponentFixture<ArchPatternsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchPatternsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchPatternsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
