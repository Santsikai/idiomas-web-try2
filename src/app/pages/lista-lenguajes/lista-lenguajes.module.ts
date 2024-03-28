import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLenguajesComponent } from './lista-lenguajes.component';
import { ListaLenguajesRoutingModule } from './lista-lenguaje-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ListaLenguajesComponent
  ],
  imports: [
    CommonModule,
    ListaLenguajesRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class ListaLenguajesModule { }
