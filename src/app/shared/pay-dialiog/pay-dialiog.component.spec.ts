import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDialiogComponent } from './pay-dialiog.component';

describe('PayDialiogComponent', () => {
  let component: PayDialiogComponent;
  let fixture: ComponentFixture<PayDialiogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayDialiogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayDialiogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
