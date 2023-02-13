# Manejo de Formularios

Este proyecto se encuentra repurado y no se encuentran los metodos y elementos que acontinuacion se detallan.

## FormsModule

Para el manejo de formularios en angular necesitamos:

1.- Importar en modulo de formularios (FormsModule) en el modulo de nuestros componentes (Module).
2.- Crear el formulario en el .html de nuestro componentes con la accion personalizada (ngSubmit), al parecer funciona tambien solo con (submit).
3.- Por ultimo manejar la accion del ngSubmit con la funcion creada en el .ts de nuestro compoenente.

```typescript
// Se agrega el FormsModule al Modulo del proyecto
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa el FormsModule

@NgModule({
  declarations: [], // Bloque de declaracion de componentes
  imports: [        // Bloque de importacion de modulos de Angular (formsModule) y personalizados
    CommonModule,
    FormsModule
  ],
  exports:[         // Bloque de exportaciones de los componentes que se sea exponert
    MainPageComponent
  ],
  providers: [      // Bloque de impoeraciones de servicios que se ocuparan
    DbzService
  ]
})
export class DbzModule { }

```

```html

<!-- html del componente -->
<form (ngSubmit)="agregar()">
    <input type="text" placeholder="Nombre" name="nombre" [(ngModel)]="nuevo.nombre">
    <input type="number" placeholder="Poder" name="poder" [(ngModel)]="nuevo.poder">
    <button type="submit">Agregar</button>
</form>

```


``` typescript
// TypeScript del componente
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../service/dbz.service';

// Se crea una interfas para recibir los datos del formulario
interface Personaje{
    nombre: string;
    poder:  number;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  nuevo: Personaje ={
    nombre: 'Trucks',
    poder:  17000
  }
  agregar(): void{

    console.log("Se ejecuto submit del formulario");
    console.log(nuevo);
    
  }
}

```


# Crear componenetes Hijos

## Compoenentes Hijo

Aisla los componentes en pequeños componentes indepenedientes reutilizables de menor tamaño y complejidad.
La siguiente estructura del componentes padre y del hijo:

dbz
 ├ main-page     (Componente Padre)
 │ ├ main-page.component.html
 │ └ main-page.component.ts
 │
 ├ personajes   (componente hijo)
 │ ├ personajes.component.html
 │ └ personajes.component.ts

Los componentes deben de estar registrado modulo y exportado el principal para que pueda ser accedido:

```typescript
// ts del modulo

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { PersonajesComponent } from './personajes/personajes.component';

import { DbzService } from './service/dbz.service';



@NgModule({
  declarations: [   // Componentes padre mainPage e hija personajes
    MainPageComponent,
    PersonajesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MainPageComponent // Se expone mainPage para que pueda ser consultada
  ],
  providers: [
    DbzService
  ]
})
export class DbzModule { }

```

```html
<!-- html del componente hijo -->

<ul>
    <li *ngFor="let personaje of personajes">{{ personaje.nombre }} - {{ personaje.poder | number }}</li>
</ul>

```

```typescript
// ts del componente hijo

import { Component, Input } from '@angular/core';
import { DbzService } from '../service/dbz.service';

 interface Personaje{
    nombre: string;
    poder:  number;
 }

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent {

    personajes: Personaje[] = [
        {
            nombre: 'Goku',
            poder:  15000
        },
        {
            nombre: 'Vegeta',
            poder:  8500
        }
    ];

}

```


```html
<!-- Se hace la consulta del componente hijo en el padre -->

<div class="col">
    <app-personajes></app-personajes>
</div>

```


# Comunicacion entre componentes @Input, @Output y EventEmitter

## @Input

Envia las referencia de compoenente de padre a hijo:


```typescript
// ts del componente hijo
import { Component, Input } from '@angular/core';
import { DbzService } from '../service/dbz.service';

 interface Personaje{
    nombre: string;
    poder:  number;
 }

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent {
    // Se indica con el @input que recibira informacion por referencia del compoente padre.
    // Entre parentesiste de puede colocar nombre de la referencia entre comillas: 
    // @Input("nuevoNombre")
    // <app-personajes [nuevoNombre]="personajes"></app-personajes>
    @Input() personajes: Personaje[] = [];

}

```

```html
<!-- html del componente hijo -->
<ul>
    <li *ngFor="let personaje of personajes">{{ personaje.nombre }} - {{ personaje.poder | number }}</li>
</ul>

```

```typescript

import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
//Personajes que seran enviados al componentes hijo
    personajes: Personaje[] = [
        {
            nombre: 'Goku',
            poder:  15000
        },
        {
            nombre: 'Vegeta',
            poder:  8500
        }
    ];  
}

```

```html

<div class="col">
    <!-- como se indico nada en los parentesis del input del componente hijo toma el nombre de la variable -->
    <app-personajes [personajes]="personajes"></app-personajes>
</div>

```

## @Output y EventEmitter

Envia las referencia de compoenente de hijo al padre:

```typescript
// ts del componente hijo
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../service/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  nuevo: Personaje = {
    nombre: '',
    poder:  0
  };

  @Output() nuevoPersonaje: EventEmitter = new EventEmitter<Personaje>();

  constructor(private dbzService: DbzService) {}

  agregar(): void{
    if(this.nuevo.nombre.trim().length === 0){
      return;
    }
    // Emite el nuevo objeto hacia el padre como evento
    this.nuevoPersonaje.emit(this.nuevo);  
  }
}

```

```html
<!-- html del componente padre -->
 <div class="col">
    <app-agregar [nuevo]="nuevo" (nuevoPersonaje)="agregarPersonaje($event)"></app-agregar>
</div>

```

```typescript

import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  nuevo: Personaje = {
    nombre: 'Maestro Roshi',
    poder: 0
  }

  personajes: Personaje[] = [
   {
     nombre: 'Goku',
     poder:  15000
   },
   {
     nombre: 'Vegeta',
     poder:  8500
   }
  ];  
  
  agregarPersonaje(personaje: Personaje): void{
    this.personajes.push(personaje);
  }
  
}


```

# Creacion y utilizacion de un Service

## Service

El servicio es típicamente una clase con un propósito limitado y bien definido. Debe hacer algo específico y hacerlo bien.

```typescript
// Declaracion de un servicio en un modulo para que pueda ser utilizado.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { AgregarComponent } from './agregar/agregar.component';

import { DbzService } from './service/dbz.service';



@NgModule({
  declarations: [
    MainPageComponent,
    PersonajesComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MainPageComponent
  ],
  providers: [ //Declaracion de un servicio en un modulo
    DbzService
  ]
})
export class DbzModule { }

```

```typescript
// ts de un servicio, su estructura
import { Injectable } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Injectable()
export class DbzService {

    private _personajes: Personaje[] = [
        {
          nombre: 'Goku',
          poder:  15000
        },
        {
          nombre: 'Vegeta',
          poder:  8500
        }
      ];
   
   // Puede ser util para mandar un arreglo sin enviarlo como referencia.
    get personajes(): Personaje[] {
        return [...this._personajes];
    }

    constructor() {
        console.log('Servicio DbzService inicializado')
    }

    agregarPersonje(personaje: Personaje) {
        this._personajes.push(personaje);
    }
}

```


```typescript
// ts de compoenten agregar donde se implementa un servicio
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

  // En el comstructura de inyecta el servicio para que pueda ser utilizado
  // se debe declara como privado ya que solo puede usado en este componente
  constructor(private dbzService: DbzService) {}

  agregar(): void{
    if(this.nuevo.nombre.trim().length === 0){
      return;
    }

    // Ulizacion del servicio
    this.dbzService.agregarPersonje(this.nuevo);
        
  }
}

```
