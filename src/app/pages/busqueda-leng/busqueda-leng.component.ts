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
    private idiomaSV:IdiomaService,
    private router:Router
  ){}
  lang=lang;
  idiomaNombre="";
  idiomaLenguaje="";
  listResultados:any=[]
  moveToLeng(idioma:Idioma){
    localStorage.setItem('langUserID',idioma.user_id)
    localStorage.setItem('langprivacity',String(idioma.private))
    this.router.navigate(['/pages/lenguaje',idioma.id]);
  }
  search(){
    if(this.idiomaLenguaje ==""){
      this.idiomaSV.getListIdiomabyNombre(this.idiomaNombre).subscribe((res:any)=>{
        this.listResultados=res
      })
    }else{
    this.idiomaSV.getListIdiomabyNombreAndLenguaje(this.idiomaNombre,this.idiomaLenguaje).subscribe((res:any)=>{
      this.listResultados=res
    })
  }
  }
}
