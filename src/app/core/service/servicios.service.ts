import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios } from '../models/ServiciosModel';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl = 'http://localhost:3000/beneficios';

  constructor(private http: HttpClient) {}

  getBeneficios(): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(this.apiUrl);
  }
}
