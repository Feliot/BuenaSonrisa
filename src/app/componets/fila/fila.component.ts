import { Component, OnInit, Input, AfterContentInit ,Output ,EventEmitter} from '@angular/core';


@Component({
  selector: '[app-fila]',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {
  @Input() item;
  @Output() Cargar = new EventEmitter();
  


  manejadora(a) {
    // let persona = new Persona (this.name, this.surname);
    let aa = JSON.stringify(a);
    /* console.log(aa) */
    this.Cargar.emit(aa);
    }

  constructor() { }

  ngOnInit() {
/*     console.log(this.item); */
  }

}
