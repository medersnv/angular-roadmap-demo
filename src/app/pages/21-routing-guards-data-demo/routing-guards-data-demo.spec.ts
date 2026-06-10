import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingGuardsDataDemo } from './routing-guards-data-demo';

describe('RoutingGuardsDataDemo', () => {
  let component: RoutingGuardsDataDemo;
  let fixture: ComponentFixture<RoutingGuardsDataDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingGuardsDataDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingGuardsDataDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
