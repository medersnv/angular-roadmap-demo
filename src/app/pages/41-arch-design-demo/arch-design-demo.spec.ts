import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchDesignDemo } from './arch-design-demo';

describe('ArchDesignDemo', () => {
  let component: ArchDesignDemo;
  let fixture: ComponentFixture<ArchDesignDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchDesignDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchDesignDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
