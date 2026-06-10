import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpProtocolDemo } from './http-protocol-demo';

describe('HttpProtocolDemo', () => {
  let component: HttpProtocolDemo;
  let fixture: ComponentFixture<HttpProtocolDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpProtocolDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpProtocolDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
