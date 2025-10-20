import { formatDate } from '@angular/common';
import { inject, Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GrupoVocabularioService } from '../grupoVocabulario/grupo-vocabulario.service';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

 private http = inject(HttpClient);
  private locale = 'es-ES';

  private API = 'http://localhost:8001/idiomas';
  private API_USER = 'http://localhost:8001/idioma_users';

  constructor() {}

  // IDIOMA -------------------

  public createIdioma(user_id: string, nombre: string, lenguaje: string, pribate: boolean): Observable<any> {
    const idioma = new Idioma();
    idioma.id = formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', this.locale);
    idioma.nombre = nombre;
    idioma.user_id = user_id;
    idioma.lenguaje = lenguaje;
    idioma.private = pribate;

    return this.http.post(`${this.API}/`, idioma);
  }

  public createIdiomaWithID(id: string, user_id: string, nombre: string, lenguaje: string, pribate: boolean): Observable<any> {
    const idioma = new Idioma();
    idioma.id = id;
    idioma.nombre = nombre;
    idioma.user_id = user_id;
    idioma.lenguaje = lenguaje;
    idioma.private = pribate;

    return this.http.post(`${this.API}/`, idioma);
  }

  public getIdioma(id: string): Observable<Idioma> {
    return this.http.get<Idioma>(`${this.API}/${id}`);
  }

  public getListIdiomaByUserId(userId: string): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${this.API}/por_usuario/${userId}`);
  }

  public getListIdiomaByNombre(nombre: string): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${this.API}/publicos?nombre=${nombre.toLowerCase()}`);
  }

  public getListIdiomaByNombreAndLenguaje(nombre: string, lenguaje: string): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${this.API}/publicos_lenguaje?nombre=${nombre.toLowerCase()}&lenguaje=${lenguaje}`);
  }

  public editIdioma(id: string, newname: string, lenguaje: string, pribate: boolean): Observable<any> {
    return this.http.put(`${this.API}/${id}`, {
      nombre: newname,
      lenguaje: lenguaje,
      private: pribate,
    });
  }

  public deleteIdioma(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  // IDIOMA USER -------------------

  public createIdiomaUser(user_id: string, idioma_id: string): Observable<any> {
    const idiomaUser = new IdiomaUser();
    idiomaUser.id = formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', this.locale);
    idiomaUser.user_id = user_id;
    idiomaUser.idioma_id = idioma_id;
    idiomaUser.active = true;

    return this.http.post(`${this.API_USER}/`, idiomaUser);
  }

  public getIdiomaUser(id: string): Observable<IdiomaUser> {
    return this.http.get<IdiomaUser>(`${this.API_USER}/${id}`);
  }

  public getListIdiomaUserByIdioma(id: string): Observable<IdiomaUser[]> {
    return this.http.get<IdiomaUser[]>(`${this.API_USER}/por_idioma/${id}`);
  }

  public getListIdiomaUserByUser(userId: string): Observable<IdiomaUser[]> {
    return this.http.get<IdiomaUser[]>(`${this.API_USER}/por_usuario/${userId}`);
  }

  public getListIdiomaUserByIdiomaAndUser(id: string, user: string): Observable<IdiomaUser[]> {
    return this.http.get<IdiomaUser[]>(`${this.API_USER}/por_idioma_usuario/${id}/${user}`);
  }

  public editIdiomaUserChangePrivacy(id: string, active: boolean): Observable<any> {
    return this.http.put(`${this.API_USER}/${id}`, {
      active: active,
    });
  }

  public deleteIdiomaUser(id: string): Observable<any> {
    return this.http.delete(`${this.API_USER}/${id}`);
  }

  public deleteAllIdiomaUserByIdioma(id: string): Observable<any> {
    return this.getListIdiomaUserByIdioma(id).pipe(
      switchMap((lista) => {
        const deletes = lista.map(iu => this.deleteIdiomaUser(iu.id));
        return forkJoin(deletes);
      })
    );
  }

  public getListIdiomaByIdiomaUserId(userId: string): Observable<Idioma[]> {
    return this.getListIdiomaUserByUser(userId).pipe(
      switchMap((res: IdiomaUser[]) => {
        const requests = res.map(iu => this.getIdioma(iu.idioma_id));
        return forkJoin(requests);
      })
    );
  }

}
export class Idioma{
  id:string="";
  nombre:string="";
  user_id:string="";
  lenguaje:string="";
  private:boolean=false;
}
export class IdiomaUser{
  id:string="";
  idioma_id:string="";
  user_id:string="";
  active:boolean=true;
}
export const lang = [
  { code: 'aa', name: 'Afar' },
  { code: 'ab', name: 'Abkhazian' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'as', name: 'Assamese' },
  { code: 'ay', name: 'Aymara' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'bh', name: 'Bihari' },
  { code: 'bi', name: 'Bislama' },
  { code: 'bn', name: 'Bengali/Bangla' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'br', name: 'Breton' },
  { code: 'ca', name: 'Catalan' },
  { code: 'co', name: 'Corsican' },
  { code: 'cs', name: 'Czech' },
  { code: 'cy', name: 'Welsh' },
  { code: 'da', name: 'Danish' },
  { code: 'de', name: 'German' },
  { code: 'dz', name: 'Dzongkha' },
  { code: 'el', name: 'Greek' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'es', name: 'Spanish' },
  { code: 'et', name: 'Estonian' },
  { code: 'eu', name: 'Basque' },
  { code: 'fa', name: 'Persian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fj', name: 'Fijian' },
  { code: 'fo', name: 'Faroese' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'ga', name: 'Irish' },
  { code: 'gd', name: 'Gaelic (Scots)' },
  { code: 'gl', name: 'Galician' },
  { code: 'gn', name: 'Guarani' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'gv', name: 'Manx' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ho', name: 'Hiri Motu' },
  { code: 'hr', name: 'Croatian' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'hy', name: 'Armenian' },
  { code: 'hz', name: 'Herero' },
  { code: 'ia', name: 'Interlingua' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ie', name: 'Interlingue' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ii', name: 'Sichuan Yi' },
  { code: 'ik', name: 'Inupiak' },
  { code: 'io', name: 'Ido' },
  { code: 'is', name: 'Icelandic' },
  { code: 'it', name: 'Italian' },
  { code: 'iu', name: 'Inuktitut' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'ka', name: 'Georgian' },
  { code: 'kg', name: 'Kongo' },
  { code: 'ki', name: 'Kikuyu' },
  { code: 'kj', name: 'Kuanyama' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'kl', name: 'Greenlandic' },
  { code: 'km', name: 'Cambodian' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ko', name: 'Korean' },
  { code: 'kr', name: 'Kanuri' },
  { code: 'ks', name: 'Kashmiri' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'kv', name: 'Komi' },
  { code: 'kw', name: 'Cornish' },
  { code: 'ky', name: 'Kirghiz' },
  { code: 'la', name: 'Latin' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'lg', name: 'Ganda' },
  { code: 'li', name: 'Limburgish' },
  { code: 'ln', name: 'Lingala' },
  { code: 'lo', name: 'Laothian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lu', name: 'Luba-Katanga' },
  { code: 'lv', name: 'Latvian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'mh', name: 'Marshallese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'mo', name: 'Moldavian' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ms', name: 'Malay' },
  { code: 'mt', name: 'Maltese' },
  { code: 'my', name: 'Burmese' },
  { code: 'na', name: 'Nauru' },
  { code: 'nb', name: 'Norwegian (Bokmal)' },
  { code: 'nd', name: 'North Ndebele' },
  { code: 'ne', name: 'Nepali' },
  { code: 'ng', name: 'Ndonga' },
  { code: 'nl', name: 'Dutch' },
  { code: 'nn', name: 'Norwegian (Nynorsk)' },
  { code: 'no', name: 'Norwegian' },
  { code: 'nr', name: 'South Ndebele' },
  { code: 'nv', name: 'Navajo' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'oc', name: 'Occitan' },
  { code: 'oj', name: 'Ojibwa' },
  { code: 'om', name: 'Oromo' },
  { code: 'or', name: 'Oriya' },
  { code: 'os', name: 'Ossetian' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'pi', name: 'Pali' },
  { code: 'pl', name: 'Polish' },
  { code: 'ps', name: 'Pashto' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'qu', name: 'Quechua' },
  { code: 'rm', name: 'Rhaeto-Romance' },
  { code: 'rn', name: 'Kirundi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'sc', name: 'Sardinian' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'se', name: 'Northern Sami' },
  { code: 'sg', name: 'Sango' },
  { code: 'sh', name: 'Serbo-Croatian' },
  { code: 'si', name: 'Sinhalese' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'sn', name: 'Shona' },
  { code: 'so', name: 'Somali' },
  { code: 'sq', name: 'Albanian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'ss', name: 'Siswati' },
  { code: 'st', name: 'Sesotho' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sv', name: 'Swedish' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'tg', name: 'Tajik' },
  { code: 'th', name: 'Thai' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'tn', name: 'Tswana' },
  { code: 'to', name: 'Tonga' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ts', name: 'Tsonga' },
  { code: 'tt', name: 'Tatar' },
  { code: 'tw', name: 'Twi' },
  { code: 'ty', name: 'Tahitian' },
  { code: 'ug', name: 'Uighur' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'uz', name: 'Uzbek' },
  { code: 've', name: 'Venda' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'vo', name: 'Volapük' },
  { code: 'wa', name: 'Walloon' },
  { code: 'wo', name: 'Wolof' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'za', name: 'Zhuang' },
  { code: 'zh', name: 'Chinese' },
  { code: 'zu', name: 'Zulu' }
];