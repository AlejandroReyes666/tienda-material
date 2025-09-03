import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  output,
} from '@angular/core';
import { Producto } from '../../../core/models/ProductosModel';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DialogEliminarComponent } from '../../../shared/dialogEliminar/dialog-eliminar/dialog-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/service/cart.service';
import { CartItem } from '../../../core/models/cartItemsModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DialogEliminarComponent,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() Product!: Producto;
  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() addToCartEvent = new EventEmitter<Producto>();

  cartItems$!: Observable<CartItem[]>;

  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private AuthService: AuthService,
    private cartService: CartService
  ) {}

  actualizarProducto() {
    console.log('El producto a actializar es ', this.Product);
    this.editar.emit(this.Product);
  }

  openDialogEliminar(product: Producto): void {
    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      width: '550px',
      data: product || null,
    });

    dialogRef
      .afterClosed()
      .subscribe((productoIdEliminado: number | undefined) => {
        if (productoIdEliminado !== undefined) {
          this.eliminar.emit(productoIdEliminado);
        }
      });
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    console.log('ID del producto:', this.Product?.id);

    console.log("Lo que hay en catItems$ es: "+this.cartItems$);
    this.AuthService.role$.subscribe((role) => {
      this.isAdmin = role === 'administrador';
    });
  }

  addToCart(product: Producto): void {
    console.log('Producto añadido al carrito:', product);
    this.cartService.addToCart(product);
    this.addToCartEvent.emit(product);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  removeOne(product: Producto) {
    this.cartService.removeOneFromCart(product);
  }

  isProductInCart(items: CartItem[], productId: number): boolean {
    console.log(
      'resultado en isProductInCart: ',
      items.some((item) => item.product.id === productId)
    );
    return items.some((item) => item.product.id === productId);
  }

  isOfertaActiva(product: Producto): boolean {
  const hoy = new Date();
  const inicio = product.fechaInicioOferta ? new Date(product.fechaInicioOferta) : null;
  const fin = product.fechaFinOferta ? new Date(product.fechaFinOferta) : null;

  return (
    product.enOferta === true &&
    inicio !== null &&
    fin !== null &&
    hoy >= inicio &&
    hoy <= fin
  );
}





}
