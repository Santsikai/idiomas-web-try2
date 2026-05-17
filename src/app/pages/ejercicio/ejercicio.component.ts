import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GrupoVocabulario, GrupoVocabularioService } from '../../services/grupoVocabulario/grupo-vocabulario.service';
import { Palabra, PalabraService } from '../../services/palabra/palabra.service';


@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent {
  activeView: 'estudiar' | 'practicar' = 'estudiar';
  gv: GrupoVocabulario = new GrupoVocabulario;
  listPalabraID: string[] = [];
  listPalabra: Palabra[] = [];
  id: any;
  showModal = false;
  col1New: any;
  col2New: any;

  searchPalabra = '';
  wordPage = 0;
  readonly wordPerPage = 10;

  get filteredPalabra(): Palabra[] {
    const q = this.searchPalabra.trim().toLowerCase();
    return q
      ? this.listPalabra.filter(p =>
          p.col1.toLowerCase().includes(q) || p.col2.toLowerCase().includes(q)
        )
      : this.listPalabra;
  }

  get wordTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredPalabra.length / this.wordPerPage));
  }

  get wordPageItems(): Palabra[] {
    const start = this.wordPage * this.wordPerPage;
    return this.filteredPalabra.slice(start, start + this.wordPerPage);
  }

  get wordPageRange(): number[] {
    return Array.from({ length: this.wordTotalPages }, (_, i) => i);
  }

  onSearchPalabra(value: string) {
    this.searchPalabra = value;
    this.wordPage = 0;
  }

  setView(view: 'estudiar' | 'practicar') {
    this.activeView = view;
    if (view === 'estudiar' && this.listPalabra.length === 0) {
      this.getlistPalabraEST();
    }
  }
  constructor(
    private ARoute:ActivatedRoute,
    private router:Router,
    private gvSV:GrupoVocabularioService,
    private palabraSV:PalabraService
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('gvid')!.replace(/%20/g, ' ');
    this.getlistPalabraID();
    this.getlistPalabraEST();
  }
async getGV(){
    this.gv = await firstValueFrom(this.gvSV.getGrupoVocabulario(this.id));
  }
  getlistPalabraID(){
    this.palabraSV.getListPalabrabyGvId(this.id).subscribe((res:any)=>{
      this.getGV();
      this.listPalabraID=res;
    })
  }

  getlistPalabraEST(){
    this.palabraSV.getListPalabrabyGvId(this.id).subscribe((res:any)=>{
      this.listPalabra=res;
    })
  }

  

  sortOrder: 'asc' | 'desc' = 'asc';
  sortedColumn: string | null = null;

  sort(column: string): void {
    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortOrder = 'asc';
    }
    this.listPalabra.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    this.wordPage = 0;
  }

  create() {
    this.palabraSV.createPalabra(this.id, this.col1New, this.col2New).subscribe((res: any) => {
      this.listPalabra.push(res);
      this.col1New = '';
      this.col2New = '';
      this.showModal = false;
    });
  }

}
