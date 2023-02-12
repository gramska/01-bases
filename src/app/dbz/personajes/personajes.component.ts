import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../service/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent {

  get personajes() {
    return this.dbzService.personajes;
  }

  constructor(private dbzService: DbzService) {
    console.log('Consutructor personaje');
  }

}
