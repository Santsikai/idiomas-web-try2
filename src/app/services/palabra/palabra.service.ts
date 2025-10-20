import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Palabra {
  id: string;
  gv_id: string;
  col1: string;
  col2: string;
}

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  private API = 'http://localhost:8001/palabra';

  constructor(private http: HttpClient) {}

  // Crear palabra
  createPalabra( gv_id: string, col1: string, col2: string): Observable<Palabra> {
    var id=String(Date.now());
    return this.http.post<Palabra>(`${this.API}/`, { id, gv_id, col1, col2 });
  }

  // Obtener todas las palabras
  getAll(): Observable<Palabra[]> {
    return this.http.get<Palabra[]>(`${this.API}/`);
  }

  // Obtener por id
  getPalabra(id: string): Observable<Palabra> {
    return this.http.get<Palabra>(`${this.API}/${id}`);
  }

  // Obtener por gv_id
  getListPalabrabyGvId(gv_id: string): Observable<Palabra[]> {
    return this.http.get<Palabra[]>(`${this.API}/gv/${gv_id}`);
  }

  // Editar palabra
  editPalabra(id: string, col1: string, col2: string): Observable<Palabra> {
    return this.http.put<Palabra>(`${this.API}/${id}`, { col1, col2 });
  }

  // Eliminar por id
  deletePalabra(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  // Eliminar todas las palabras de un grupo
  deletePalabrabyGvId(gv_id: string): Observable<any> {
    return this.http.delete(`${this.API}/gv/${gv_id}`);
  }
}
