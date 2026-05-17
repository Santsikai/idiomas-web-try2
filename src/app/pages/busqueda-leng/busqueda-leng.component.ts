import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Idioma, IdiomaService, lang } from '../../services/idioma/idioma.service';


@Component({
  selector: 'app-busqueda-leng',
  templateUrl: './busqueda-leng.component.html',
  styleUrls: ['./busqueda-leng.component.scss']
})
export class BusquedaLengComponent {
  constructor(
    private idiomaSV: IdiomaService,
    private router: Router
  ) {}

  selectedlangs = lang;
  idiomaNombre = '';
  idiomaLenguaje = '';
  idiomaUsuario = '';
  listResultados: any[] = [];
  searched = false;
  loading = false;
  searchError = false;

  // Paginación de resultados
  resultsPage = 0;
  readonly resultsPerPage = 8;

  get resultsTotalPages(): number {
    return Math.max(1, Math.ceil(this.listResultados.length / this.resultsPerPage));
  }

  get resultsPageItems(): any[] {
    const start = this.resultsPage * this.resultsPerPage;
    return this.listResultados.slice(start, start + this.resultsPerPage);
  }

  onKey(value: any) {
    const filter = value.target.value.toLowerCase();
    this.selectedlangs = lang.filter(o => o.name.toLowerCase().includes(filter) || o.code.toLowerCase().startsWith(filter));
  }

  moveToLeng(idioma: Idioma) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('langUserID', idioma.user_id);
      localStorage.setItem('langprivacity', String(!!idioma.private));
    }
    this.router.navigate(['/pages/lenguaje', idioma.id]);
  }

  search() {
    this.resultsPage = 0;
    this.searched = false;
    this.loading = true;
    this.searchError = false;
    const obs = this.idiomaLenguaje === ''
      ? this.idiomaSV.getListIdiomaByNombre(this.idiomaNombre, this.idiomaUsuario)
      : this.idiomaSV.getListIdiomaByNombreAndLenguaje(this.idiomaNombre, this.idiomaLenguaje, this.idiomaUsuario);

    obs.subscribe({
      next: (res: any) => {
        console.log('[Search] res:', res, 'length:', Array.isArray(res) ? res.length : 'NOT ARRAY');
        this.listResultados = Array.isArray(res) ? res : [];
        this.searched = true;
        this.loading = false;
      },
      error: () => {
        this.listResultados = [];
        this.searched = true;
        this.loading = false;
        this.searchError = true;
      }
    });
  }
}
