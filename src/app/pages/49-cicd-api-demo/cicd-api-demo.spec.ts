import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdApiDemo } from './cicd-api-demo';

describe('CicdApiDemo', () => {
  let component: CicdApiDemo;
  let fixture: ComponentFixture<CicdApiDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicdApiDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(CicdApiDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
