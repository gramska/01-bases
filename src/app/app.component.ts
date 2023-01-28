import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titulo: string = 'Contador App';
  numero: number = 0;
  base: number = 2;

  acumular(valor: number): void{
    this.numero += valor;
  }
}
