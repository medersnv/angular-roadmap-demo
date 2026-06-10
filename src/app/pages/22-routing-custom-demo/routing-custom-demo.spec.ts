import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingCustomDemo } from './routing-custom-demo';

describe('RoutingCustomDemo', () => {
  let component: RoutingCustomDemo;
  let fixture: ComponentFixture<RoutingCustomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingCustomDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingCustomDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
