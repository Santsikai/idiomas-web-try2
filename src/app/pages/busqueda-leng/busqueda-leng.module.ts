import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaLengComponent } from './busqueda-leng.component';
import { BusquedaLengRoutingModule } from './busqueda-leng-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    BusquedaLengComponent
  ],
  imports: [
    CommonModule,
    BusquedaLengRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class BusquedaLengModule { }
