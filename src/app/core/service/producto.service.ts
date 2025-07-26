import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/ProductosModel';

@Injectable({ providedIn: 'root' })
export class ProductoServiceService {
  private Appiurl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.Appiurl);
  }

  agregarProductos(nuevoProducto:Producto):Observable<Producto>{
      return this.http.post<Producto>(this.Appiurl,nuevoProducto);
  
  }

  updateProduct(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.Appiurl}/${id}`, producto);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Appiurl}/${id}`);
  }
}