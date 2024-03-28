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
  constructor(
    private idiomaSV:IdiomaService,
    private router:Router,
    private fileSV:FileService
  ) { }

  ngOnInit() {
    this.getUserID();
    
  }

  onKey(value:any) { 
    this.selectedlangs = this.search(value.target.value);
    }

    search(value: string) { 
      let filter = value.toLowerCase();
      return lang.filter(option => option.code.toLowerCase().startsWith(filter));
    }
  moveToLeng(idioma:Idioma){
    localStorage.setItem('langUserID',idioma.user_id)
    localStorage.setItem('langprivacity',String(idioma.private))
    this.router.navigate(['/pages/lenguaje',idioma.id]);
  }
  public async getUserID(){
      this.userId=localStorage.getItem("logUserID");
      this.idiomaSV.getListIdiomabyUserId(this.userId ).subscribe((res:any)=>{
        this.listIdiomas=res
        this.idiomaSV.getListIdiomabyIdiomaUserId(this.userId).subscribe((r:any)=>{
          this.listIdiomasC=r
        })
      });
      
  }
  file:any;
  loadFile(e:any){
    this.file=e.target.files[0];
    
   }
   async confirmImport() {
    await this.fileSV.importDataFromFile(this.file,this.userId)
    this.showModal=false;
   }

  create() {

    this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad);
    this.nombreLeng="";
    this.showModal=false
}




}
