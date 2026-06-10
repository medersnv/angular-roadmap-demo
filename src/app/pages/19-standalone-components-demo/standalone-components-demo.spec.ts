import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneComponentsDemo } from './standalone-components-demo';

describe('StandaloneComponentsDemo', () => {
  let component: StandaloneComponentsDemo;
  let fixture: ComponentFixture<StandaloneComponentsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneComponentsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneComponentsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
