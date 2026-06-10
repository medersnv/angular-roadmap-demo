import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchRelationsDemo } from './arch-relations-demo';

describe('ArchRelationsDemo', () => {
  let component: ArchRelationsDemo;
  let fixture: ComponentFixture<ArchRelationsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchRelationsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchRelationsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
