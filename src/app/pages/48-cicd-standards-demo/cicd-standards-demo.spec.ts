import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdStandardsDemo } from './cicd-standards-demo';

describe('CicdStandardsDemo', () => {
  let component: CicdStandardsDemo;
  let fixture: ComponentFixture<CicdStandardsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicdStandardsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(CicdStandardsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
