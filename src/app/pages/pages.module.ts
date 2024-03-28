import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { PerfilModule } from "./perfil/perfil.module";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { IdiomaService } from "../services/idioma/idioma.service";
import { GrupoVocabularioService } from "../services/grupoVocabulario/grupo-vocabulario.service";
import { PalabraService } from "../services/palabra/palabra.service";
import { FileService } from "../services/files/file.service";


@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    PagesComponent,
    
  ],
  providers:[
    IdiomaService,
    GrupoVocabularioService,
    PalabraService,
    FileService
  ]
})
export class PagesModule { }
