import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError } from'rxjs';
import { ContactForm } from '../models/contactModel';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly appiUrl='http://localhost:3000/contactos'

  constructor(private http: HttpClient) { }

  guardarPeticionesDeContacto(solicitudContacto:ContactForm):Observable<any>{
    return this.http.post(this.appiUrl,solicitudContacto).pipe(
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

