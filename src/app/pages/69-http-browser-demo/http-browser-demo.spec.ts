import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpBrowserDemo } from './http-browser-demo';

describe('HttpBrowserDemo', () => {
  let component: HttpBrowserDemo;
  let fixture: ComponentFixture<HttpBrowserDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpBrowserDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpBrowserDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
