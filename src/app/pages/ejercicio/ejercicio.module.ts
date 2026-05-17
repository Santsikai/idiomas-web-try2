import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjercicioComponent } from './ejercicio.component';
import { EjercicioRoutingModule } from './ejercicio-routing.module';
import { FormsModule } from '@angular/forms';
import { EjercicioEscribirComponent } from '../ejercicio-escribir/ejercicio-escribir.component';



@NgModule({
  declarations: [
    EjercicioComponent,
    EjercicioEscribirComponent
  ],
  imports: [
    CommonModule,
    EjercicioRoutingModule,
    FormsModule,
    
  ]
})
export class EjercicioModule { }
