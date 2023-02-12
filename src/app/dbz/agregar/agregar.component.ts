import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../service/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {


  @Input() nuevo: Personaje = {
    nombre: '',
    poder:  0
  };

  // @Output() nuevoPersonaje: EventEmitter = new EventEmitter<Personaje>();

  constructor(private dbzService: DbzService) {}

  agregar(): void{
    if(this.nuevo.nombre.trim().length === 0){
      return;
    }

    this.dbzService.agregarPersonje(this.nuevo);
    
    this.nuevo = {
      nombre: '',
      poder: 0
    }

    
  }
}
