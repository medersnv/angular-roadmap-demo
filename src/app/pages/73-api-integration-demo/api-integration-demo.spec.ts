import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiIntegrationDemo } from './api-integration-demo';

describe('ApiIntegrationDemo', () => {
  let component: ApiIntegrationDemo;
  let fixture: ComponentFixture<ApiIntegrationDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiIntegrationDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiIntegrationDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
