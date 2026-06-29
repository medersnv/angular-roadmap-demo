import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapApplicationDemo } from './bootstrap-application-demo';

describe('BootstrapApplicationDemo', () => {
  let component: BootstrapApplicationDemo;
  let fixture: ComponentFixture<BootstrapApplicationDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootstrapApplicationDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BootstrapApplicationDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
