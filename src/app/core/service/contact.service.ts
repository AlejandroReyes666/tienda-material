import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/contactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly appiUrl='http://localhost:3000/contactos'

  constructor(private http: HttpClient) { }

  guardarPeticionesDeContacto(solicitudContacto:ContactForm):Observable<any>{
    return this.http.post(this.appiUrl,solicitudContacto);

  }
}
