import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptAdvancedDemo } from './typescript-advanced-demo';

describe('TypescriptAdvancedDemo', () => {
  let component: TypescriptAdvancedDemo;
  let fixture: ComponentFixture<TypescriptAdvancedDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptAdvancedDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TypescriptAdvancedDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
