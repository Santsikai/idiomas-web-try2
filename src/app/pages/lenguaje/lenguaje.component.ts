import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from '../../services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, IdiomaService } from '../../services/idioma/idioma.service';


@Component({
  selector: 'app-lenguaje',
  templateUrl: './lenguaje.component.html',
  styleUrls: ['./lenguaje.component.scss']
})
export class LenguajeComponent implements OnInit{
  idioma: Idioma = new Idioma;
  listgv:GrupoVocabulario[]=[];
  id:any;
  showModal=false;
  nameNew:any;
  col1New:any;
  col2New:any;
  isUserPropietary=false;
  hasUserAlreadyCompartido=false;
  idiomauserid:any;
  constructor(
    private ARoute:ActivatedRoute,
    private idiomaSV:IdiomaService,
    private gvSV:GrupoVocabularioService,
    private router:Router
  ) { } 
  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('lengid')!.replace(/%20/g, " ");
    this.getIdioma();
    this.getListaGV();
    
  }
  async getIdioma(){
    this.idioma= await this.idiomaSV.getIdioma(this.id);
  }
   getIdiomaUser(){
    this.idiomaSV.getListIdiomaUserByIdiomaandUser(this.idioma.id,localStorage.getItem('logUserID')!).subscribe((res:any)=>{
      this.hasUserAlreadyCompartido=true;
      this.idiomauserid=res.id;
    })
  }
  getListaGV(){
    this.gvSV.getListGrupoVocabulariobyIdiomaId(this.id).subscribe((res:any)=>{
      debugger;
      if(this.idioma.user_id==localStorage.getItem('logUserID')){
        this.isUserPropietary=true;
        this.getIdiomaUser()
      }
      this.listgv=res;
    })
  }

  create() {

    this.gvSV.createGrupoVocabulario(this.id,this.nameNew,this.col1New,this.col2New);
    this.nameNew="";
 this.col1New="";
 this.col2New="";
  this.showModal=false;
}

compartir(){
  this.idiomaSV.createIdiomaUser(localStorage.getItem('logUserID')!,this.idioma.id);
  this.hasUserAlreadyCompartido=true;
}
descompartir(){
  this.idiomaSV.deleteIdiomaUser(this.idiomauserid)
  this.hasUserAlreadyCompartido=false;
}
}
