import { formatDate } from '@angular/common';
import { inject,  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoVocabularioService {
 private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8001/grupos'; // Ajusta a tu backend real
  private locale = 'es-ES';

  constructor() {}

  public SetGrupoVocabularioData(apartado: GrupoVocabulario): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, apartado);
  }

  public getGrupoVocabulario(id: string): Observable<GrupoVocabulario> {
    return this.http.get<GrupoVocabulario>(`${this.apiUrl}/${id}`);
  }

  public getListGrupoVocabulariobyIdiomaId(id: string): Observable<GrupoVocabulario[]> {
    return this.http.get<GrupoVocabulario[]>(`${this.apiUrl}/por_idioma/${id}`);
  }

  public editGrupoVocabulario(
    id: string,
    newname: string,
    nombre_col1: string,
    nombre_col2: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      nombre: newname,
      nombre_col1: nombre_col1,
      nombre_col2: nombre_col2,
    });
  }

  public deleteGrupoVocabulariobyIdiomaId(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/por_idioma/${id}`);
  }

  public deleteGrupoVocabulario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public createGrupoVocabulario(
    idioma_id: string,
    nombre: string,
    col1: string,
    col2: string
  ): Observable<any> {
    const apartado = new GrupoVocabulario();
    apartado.id = formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', this.locale); // formato similar al que usabas
    apartado.nombre = nombre;
    apartado.idioma_id = idioma_id;
    apartado.nombre_col1 = col1;
    apartado.nombre_col2 = col2;

    return this.SetGrupoVocabularioData(apartado);
  }

  public createGrupoVocabularioWithID(
    id: string,
    idioma_id: string,
    nombre: string,
    col1: string,
    col2: string
  ): Observable<any> {
    const apartado = new GrupoVocabulario();
    apartado.id = id;
    apartado.nombre = nombre;
    apartado.idioma_id = idioma_id;
    apartado.nombre_col1 = col1;
    apartado.nombre_col2 = col2;

    return this.SetGrupoVocabularioData(apartado);
  }
}
export class GrupoVocabulario{
  id:string="";
  nombre:string="";
  idioma_id:string="";
  nombre_col1:string="";
  nombre_col2:string="";
}
