import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../services/files/file.service';
import { Idioma, lang, IdiomaService } from '../../services/idioma/idioma.service';


@Component({
  selector: 'app-lista-lenguajes',
  templateUrl: './lista-lenguajes.component.html',
  styleUrls: ['./lista-lenguajes.component.scss']
})
  export class ListaLenguajesComponent {
  userId:any;
  listIdiomas:Idioma[]=[];
  listIdiomasC:Idioma[]=[];
  nombreLeng:any;
  showModal=false;
  selectedLanguage:any;
  privacidad:boolean=false;
  selectedlangs=lang;
  showspinner=false;
  showModalAyuda=false;
  showModalImport=false;
  showAlert=false;

  // Carousel / paging
  pages: Idioma[][] = [];
  currentPage = 0;
  perPage = 11; // 11 items por página (añadir se queda fuera)

  constructor(
    private idiomaSV:IdiomaService,
    private router:Router,
    private fileSV:FileService
  ) { }

  ngOnInit() {
    this.getUserID();
  }

openImport(){
  this.showModal=false;
  this.showModalImport=true;
}
closeImport(){
  this.showModalImport=false;
  this.showModal=true;
}
openAyuda(){
  this.showModal=false;
  this.showModalAyuda=true;
}
closeAyuda(){
  this.showModalAyuda=false;
  this.showModal=true;
}


  // build pages a partir de los arrays actuales
  private buildPages() {
    const items = [ ...(this.listIdiomas || []), ...(this.listIdiomasC || []) ];
    this.pages = [];
    for (let i = 0; i < items.length; i += this.perPage) {
      this.pages.push(items.slice(i, i + this.perPage));
    }
    // si currentPage fuera mayor que el número de páginas, ajusta
    if (this.currentPage >= this.pages.length) {
      this.currentPage = Math.max(0, this.pages.length - 1);
    }
  }

  // Navegación del carousel
  prevPage() {
    if (this.pages.length === 0) return;
    this.currentPage = (this.currentPage - 1 + this.pages.length) % this.pages.length;
  }
  nextPage() {
    if (this.pages.length === 0) return;
    this.currentPage = (this.currentPage + 1) % this.pages.length;
  }
  goToPage(i:number) {
    if (i >= 0 && i < this.pages.length) this.currentPage = i;
  }

  onKey(value:any) { 
    this.selectedlangs = this.search(value.target.value);
  }

  search(value: string) { 
    let filter = value.toLowerCase();
    return lang.filter(option => option.code.toLowerCase().startsWith(filter));
  }

  moveToLeng(idioma:Idioma){
    if (typeof window !== 'undefined' && localStorage) {
         localStorage.setItem('langUserID',idioma.user_id)
         localStorage.setItem('langprivacity',String(idioma.private))
      }
    this.router.navigate(['/pages/lenguaje',idioma.id]);
  }

  public async getUserID(){
       if (typeof window !== 'undefined' && localStorage) {
         this.userId = localStorage.getItem("logUserID");
      }
      this.idiomaSV.getListIdiomaByUserId(this.userId ).subscribe((res:any)=>{
        this.listIdiomas=res || [];
        this.idiomaSV.getListIdiomaByIdiomaUserId(this.userId).subscribe((r:any)=>{
          this.listIdiomasC = r || [];
          this.buildPages(); // reconstruir páginas tras cargar ambos arrays
        });
      });
  }

  file:any;
  loadFile(e:any){
    this.file=e.target.files[0];
  }

   async confirmImport() {
    this.showspinner=true;
    this.showModalImport=false;
    let retu=await this.fileSV.importDataFromFile(this.file,this.userId);
    if (retu!=null){
      this.showAlert=true;
    }
    // volver a recargar listados o reconstruir páginas si importó algo nuevo
    await this.getUserID();
    this.showspinner=false;
   }

  create() {
    this.showspinner=true;
    this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad).subscribe((res:any)=>{
      this.listIdiomas.push(res);   // actualiza la lista inmediatamente
      this.buildPages();            // recomponer páginas
      this.nombreLeng="";
      this.showModal=false;
      this.showModalAyuda=false;
      this.showspinner=false;
    });
  }
}
    






