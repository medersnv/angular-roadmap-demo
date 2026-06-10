import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInternalsDemo } from './build-internals-demo';

describe('BuildInternalsDemo', () => {
  let component: BuildInternalsDemo;
  let fixture: ComponentFixture<BuildInternalsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInternalsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildInternalsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
