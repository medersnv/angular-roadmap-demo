import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectDemo } from './inject-demo';

describe('InjectDemo', () => {
  let component: InjectDemo;
  let fixture: ComponentFixture<InjectDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjectDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjectDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
