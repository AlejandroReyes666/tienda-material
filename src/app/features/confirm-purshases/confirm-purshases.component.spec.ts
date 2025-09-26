import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurshasesComponent } from './confirm-purshases.component';

describe('ConfirmPurshasesComponent', () => {
  let component: ConfirmPurshasesComponent;
  let fixture: ComponentFixture<ConfirmPurshasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPurshasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPurshasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
