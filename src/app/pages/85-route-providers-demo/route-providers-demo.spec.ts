import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteProvidersDemo } from './route-providers-demo';

describe('RouteProvidersDemo', () => {
  let component: RouteProvidersDemo;
  let fixture: ComponentFixture<RouteProvidersDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteProvidersDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteProvidersDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
