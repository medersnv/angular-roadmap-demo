import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdInfraDemo } from './cicd-infra-demo';

describe('CicdInfraDemo', () => {
  let component: CicdInfraDemo;
  let fixture: ComponentFixture<CicdInfraDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicdInfraDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(CicdInfraDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
