import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoVocabulario, GrupoVocabularioService } from '../../services/grupoVocabulario/grupo-vocabulario.service';
import { Idioma, lang, IdiomaService } from '../../services/idioma/idioma.service';
import { Palabra, PalabraService } from '../../services/palabra/palabra.service';



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
  selectedlangs=lang;
  
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
    this.idioma= await this.idiomaSV.getIdioma(this.id);
    this.idiomaCopy={...this.idioma};
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
    this.palabraSV.getListPalabrabyGvId(gv.id).subscribe((res:any)=>{
      this.listPalabra = JSON.parse(JSON.stringify(res));
      this.listPalabraCopy = JSON.parse(JSON.stringify(this.listPalabra));
      this.showEditGV=true;
    })
  }
deleteidioma(){
  this.idiomaSV.deleteIdioma(this.idioma.id)
  this.idiomaSV.deleteAllIdiomaUserByIdioma(this.idioma.id)
  this.router.navigate(['/pages']);
}
deleteGV(id:any){
  this.gvSV.deleteGrupoVocabulario(id)
}
deletepalabra(id:any){
  this.palabraSV.deletePalabra(id)
}

  guardar(){
    if(this.idioma.nombre!=this.idiomaCopy.nombre || this.idioma.private != this.idiomaCopy.private){
      if(this.idioma.private != this.idiomaCopy.private){
        this.idiomaSV.editIdiomaUserChangePrivacy(this.idioma.id,this.idioma.private)
      }
        this.idiomaSV.editIdioma(this.idioma.id,this.idioma.nombre,this.idioma.lenguaje,this.idioma.private)
    }if(this.gv.nombre!=this.gvCopy.nombre || this.gv.nombre_col1!=this.gvCopy.nombre_col1 || this.gv.nombre_col2!=this.gvCopy.nombre_col2){
        this.gvSV.editGrupoVocabulario(this.gv.id,this.gv.nombre,this.gv.nombre_col1,this.gv.nombre_col2)
    }this.listPalabra.forEach((p:Palabra, index)=>{
      if(p.col1!=this.listPalabraCopy[index].col1 || p.col2!=this.listPalabraCopy[index].col2){
        this.palabraSV.editPalabra(p.id,p.col1,p.col2)
      }
    })
  }
  
}
