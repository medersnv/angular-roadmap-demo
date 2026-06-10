import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneRoutingDemo } from './standalone-routing-demo';

describe('StandaloneRoutingDemo', () => {
  let component: StandaloneRoutingDemo;
  let fixture: ComponentFixture<StandaloneRoutingDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneRoutingDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneRoutingDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
