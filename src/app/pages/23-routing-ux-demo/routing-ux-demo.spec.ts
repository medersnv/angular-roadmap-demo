import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingUxDemo } from './routing-ux-demo';

describe('RoutingUxDemo', () => {
  let component: RoutingUxDemo;
  let fixture: ComponentFixture<RoutingUxDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingUxDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingUxDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
