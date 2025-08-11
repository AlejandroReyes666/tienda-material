export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion:string;
  imageUrl:string
  destacado?: boolean;
  enOferta?: boolean;       // true si está en oferta
  precioOferta?: number;    // precio con descuento
  fechaInicioOferta?: Date; // fecha de inicio
  fechaFinOferta?: Date;    // fecha de fin
}