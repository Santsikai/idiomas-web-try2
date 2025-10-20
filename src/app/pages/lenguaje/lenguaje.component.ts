import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from '../../services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, IdiomaService } from '../../services/idioma/idioma.service';
import { FileService } from '../../services/files/file.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-lenguaje',
  templateUrl: './lenguaje.component.html',
  styleUrls: ['./lenguaje.component.scss']
})
export class LenguajeComponent implements OnInit{
  idioma: Idioma = new Idioma;
  listgv:GrupoVocabulario[]=[];
  logUserID:any;
  id:any;
  showModal=false;
  nameNew:any;
  col1New:any;
  col2New:any;
  isUserPropietary=false;
  hasUserAlreadyCompartido=false;
  idiomauserid:any;
  showspinner=false;
  constructor(
    private ARoute:ActivatedRoute,
    private idiomaSV:IdiomaService,
    private gvSV:GrupoVocabularioService,
    private fileSV:FileService,
    private router:Router
  ) { } 
  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('lengid')!.replace(/%20/g, " ");
       if (typeof window !== 'undefined' && localStorage) {
         this.logUserID = localStorage.getItem("logUserID");
      }
    this.getIdioma();
    
    
  }
  async getIdioma(){
      
      this.idiomaSV.getIdioma(this.id).subscribe((res:any)=>{
        this.idioma =  res ;
        this.getIdiomaUser();
    this.getListaGV();
      });
    }
   getIdiomaUser(){
    this.idiomaSV.getListIdiomaUserByIdiomaAndUser(this.idioma.id,this.logUserID!).subscribe((res:any)=>{
      if(this.idioma.user_id==this.logUserID){
        this.isUserPropietary=true;
      }
      this.hasUserAlreadyCompartido=true;
      this.idiomauserid=res[0].id;
    })
  }
  getListaGV(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((res:any)=>{
      this.listgv=res;
    })
  }
  export(){
    this.fileSV.getData(this.idioma.id);
  }
  create() {

    this.gvSV.createGrupoVocabulario(this.id,this.nameNew,this.col1New,this.col2New).subscribe((res:any)=>{
      this.listgv.push(res);
    this.nameNew="";
 this.col1New="";
 this.col2New="";
  this.showModal=false;
    });
}

compartir(){
  this.idiomaSV.createIdiomaUser(this.logUserID!,this.idioma.id);
  this.hasUserAlreadyCompartido=true;
}
descompartir(){
  this.idiomaSV.deleteIdiomaUser(this.idiomauserid)
  this.hasUserAlreadyCompartido=false;
}
}
