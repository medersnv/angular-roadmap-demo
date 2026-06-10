import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebComponentsStandardsDemo } from './web-components-standards-demo';

describe('WebComponentsStandardsDemo', () => {
  let component: WebComponentsStandardsDemo;
  let fixture: ComponentFixture<WebComponentsStandardsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebComponentsStandardsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(WebComponentsStandardsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
