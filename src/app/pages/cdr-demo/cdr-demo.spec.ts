import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrDemo } from './cdr-demo';

describe('CdrDemo', () => {
  let component: CdrDemo;
  let fixture: ComponentFixture<CdrDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdrDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdrDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
