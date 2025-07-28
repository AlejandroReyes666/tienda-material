import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/ProductosModel';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ProductoServiceService {
  private Appiurl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.Appiurl).pipe(
      catchError(this.manejarError)
    );
  }

  agregarProductos(nuevoProducto:Producto):Observable<Producto>{
      return this.http.post<Producto>(this.Appiurl,nuevoProducto).pipe(
        catchError(this.manejarError)
      );
  
  }

  updateProduct(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.Appiurl}/${id}`, producto).pipe(
      catchError(this.manejarError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Appiurl}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('❌ Error del cliente:', error.error.message);
  } else {
    console.error(`❌ Error del servidor (código ${error.status}):`, error.message);
  }

  // Mensaje amigable
  return throwError(() => new Error('🚨 Ocurrió un error. Por favor, intenta más tarde.'));
}
}