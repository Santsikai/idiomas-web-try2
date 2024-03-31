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
  this.showModalAyuda=true
}
closeAyuda(){
  this.showModalAyuda=false;
  this.showModal=true;
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
    this.showspinner=true;
    this.showModalImport=false;
    let retu=await this.fileSV.importDataFromFile(this.file,this.userId);
    debugger;
    if (retu!=null){
      this.showAlert=true;
    }
    this.showspinner=false;
   }

  create() {
    this.showspinner=true;
    this.idiomaSV.createIdioma(this.userId,this.nombreLeng,this.selectedLanguage,this.privacidad);
    this.nombreLeng="";
    this.showModalAyuda=false;
    this.showspinner=false;
}




}
