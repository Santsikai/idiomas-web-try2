import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from '../../services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, lang, IdiomaService } from '../../services/idioma/idioma.service';
import { Palabra, PalabraService } from '../../services/palabra/palabra.service';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';



@Component({
  selector: 'app-edit-lenguaje',
  templateUrl: './edit-lenguaje.component.html',
  styleUrls: ['./edit-lenguaje.component.scss']
})
export class EditLenguajeComponent implements OnInit{
  idioma: Idioma = new Idioma;
  idiomaCopy: Idioma = new Idioma;
  listgv:GrupoVocabulario[]=[];
  id:any;
  listPalabra:Palabra[]=[];
  listPalabraCopy:Palabra[]=[];
  gv: GrupoVocabulario = new GrupoVocabulario;
  gvCopy: GrupoVocabulario = new GrupoVocabulario;
  showEditGV=false;
  showWordList=false;
  selectedlangs=lang;
  showConfirmDelete=false;
  showConfirmDeleteGV=false;
  pendingDeleteGVId: any = null;
  showConfirmDeletePalabra=false;
  pendingDeletePalabraId: any = null;
  alertMsg='';
  alertType: 'success'|'error'|''='';
  private alertTimer: any;

  // Búsqueda y paginación de GVs
  searchGv = '';
  gvPage = 0;
  readonly gvPerPage = 6;

  // Búsqueda y paginación de palabras
  searchPalabra = '';
  palabraPage = 0;
  readonly palabraPerPage = 6;

  get filteredPalabra(): Palabra[] {
    const q = this.searchPalabra.trim().toLowerCase();
    return q
      ? this.listPalabra.filter(p =>
          p.col1?.toLowerCase().includes(q) || p.col2?.toLowerCase().includes(q))
      : this.listPalabra;
  }

  get palabraTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredPalabra.length / this.palabraPerPage));
  }

  get palabraPageItems(): Palabra[] {
    const start = this.palabraPage * this.palabraPerPage;
    return this.filteredPalabra.slice(start, start + this.palabraPerPage);
  }

  onSearchPalabra(value: string) {
    this.searchPalabra = value;
    this.palabraPage = 0;
  }

  get filteredGv(): GrupoVocabulario[] {
    const q = this.searchGv.trim().toLowerCase();
    return q ? this.listgv.filter(g => g.nombre.toLowerCase().includes(q)) : this.listgv;
  }

  get gvTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredGv.length / this.gvPerPage));
  }

  get gvPageItems(): GrupoVocabulario[] {
    const start = this.gvPage * this.gvPerPage;
    return this.filteredGv.slice(start, start + this.gvPerPage);
  }

  onSearchGv(value: string) {
    this.searchGv = value;
    this.gvPage = 0;
  }
  
  constructor(
    private ARoute:ActivatedRoute,
    private idiomaSV:IdiomaService,
    private palabraSV:PalabraService,
    private gvSV:GrupoVocabularioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('lengid')!.replace(/%20/g, " ");
    this.getListaGV();
    
  }
  onKey(value:any) { 
    this.selectedlangs = this.search(value.target.value);
    }

    search(value: string) { 
      let filter = value.toLowerCase();
      return lang.filter(option => option.code.toLowerCase().startsWith(filter));
  
  }
  async getIdioma(){
    this.idioma = await firstValueFrom(this.idiomaSV.getIdioma(this.id));
    this.idiomaCopy = { ...this.idioma };
  }
  getListaGV(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((res:any)=>{
      debugger;
      this.getIdioma();
      this.listgv=res;
    })
  }

  getListPalabras(gv:any){
    this.gv=gv;
    this.gvCopy={ ...gv};
    this.searchPalabra = '';
    this.palabraPage = 0;
    this.palabraSV.getListPalabrabyGvId(gv.id).subscribe((res:any)=>{
      this.listPalabra = JSON.parse(JSON.stringify(res));
      this.listPalabraCopy = JSON.parse(JSON.stringify(this.listPalabra));
      this.showWordList=true;
    })
  }

  openGVEditor(gv:any){
    this.gv=gv;
    this.gvCopy={ ...gv};
    this.showEditGV=true;
  }
confirmarBorrado(){
  this.showConfirmDelete=false;
  this.idiomaSV.deleteIdioma(this.idioma.id).subscribe({
    next: () => {
      this.idiomaSV.deleteAllIdiomaUserByIdioma(this.idioma.id).subscribe();
      this.router.navigate(['/pages']);
    },
    error: () => this.showToast('No se pudo borrar el idioma', 'error')
  });
}
deleteGV(id: any) {
  this.pendingDeleteGVId = id;
  this.showConfirmDeleteGV = true;
}
confirmarBorradoGV() {
  const id = this.pendingDeleteGVId;
  this.showConfirmDeleteGV = false;
  this.pendingDeleteGVId = null;
  this.gvSV.deleteGrupoVocabulario(id).subscribe({
    next: () => {
      this.listgv = this.listgv.filter(g => g.id !== id);
      if (this.gv.id === id) { this.showEditGV = false; this.showWordList = false; }
      this.showToast('Grupo eliminado', 'success');
    },
    error: () => this.showToast('Error al eliminar el grupo', 'error')
  });
}
deletepalabra(id: any) {
  this.pendingDeletePalabraId = id;
  this.showConfirmDeletePalabra = true;
}
confirmarBorradoPalabra() {
  const id = this.pendingDeletePalabraId;
  this.showConfirmDeletePalabra = false;
  this.pendingDeletePalabraId = null;
  this.palabraSV.deletePalabra(id).subscribe({
    next: () => {
      this.listPalabra = this.listPalabra.filter(p => p.id !== id);
      this.listPalabraCopy = this.listPalabraCopy.filter(p => p.id !== id);
      this.showToast('Palabra eliminada', 'success');
    },
    error: () => this.showToast('Error al eliminar la palabra', 'error')
  });
}

  showToast(msg: string, type: 'success'|'error') {
    this.alertMsg = msg;
    this.alertType = type;
    clearTimeout(this.alertTimer);
    this.alertTimer = setTimeout(() => { this.alertMsg = ''; this.alertType = ''; }, 3500);
  }

  guardar() {
    const ops: Observable<any>[] = [];

    if (this.idioma.nombre !== this.idiomaCopy.nombre ||
        this.idioma.lenguaje !== this.idiomaCopy.lenguaje ||
        this.idioma.private !== this.idiomaCopy.private) {
      if (this.idioma.private !== this.idiomaCopy.private) {
        ops.push(this.idiomaSV.editIdiomaUserChangePrivacy(this.idioma.id, this.idioma.private));
      }
      ops.push(this.idiomaSV.editIdioma(this.idioma.id, this.idioma.nombre, this.idioma.lenguaje, this.idioma.private));
    }

    if (this.gv.id && (this.gv.nombre !== this.gvCopy.nombre ||
        this.gv.nombre_col1 !== this.gvCopy.nombre_col1 ||
        this.gv.nombre_col2 !== this.gvCopy.nombre_col2)) {
      ops.push(this.gvSV.editGrupoVocabulario(this.gv.id, this.gv.nombre, this.gv.nombre_col1, this.gv.nombre_col2));
    }

    this.listPalabra.forEach((p: Palabra, index) => {
      if (p.col1 !== this.listPalabraCopy[index]?.col1 || p.col2 !== this.listPalabraCopy[index]?.col2) {
        ops.push(this.palabraSV.editPalabra(p.id, p.col1, p.col2));
      }
    });

    if (ops.length === 0) {
      this.showToast('No hay cambios que guardar', 'success');
      return;
    }

    forkJoin(ops).subscribe({
      next: () => {
        this.idiomaCopy = { ...this.idioma };
        this.gvCopy = { ...this.gv };
        this.listPalabraCopy = JSON.parse(JSON.stringify(this.listPalabra));
        this.showToast('Cambios guardados correctamente', 'success');
      },
      error: () => this.showToast('Error al guardar los cambios', 'error')
    });
  }
  
}
