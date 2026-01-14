import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDestacadosComponent } from './productos-destacados.component';

describe('ProductosDestacadosComponent', () => {
  let component: ProductosDestacadosComponent;
  let fixture: ComponentFixture<ProductosDestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosDestacadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
