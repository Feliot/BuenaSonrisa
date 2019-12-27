import { Component, OnInit, Input, AfterContentInit, ViewChild, Inject, ɵConsole } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { miTurno } from 'src/app/models/sonrisa';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements AfterContentInit {
  @Input() text_qr;
  elementType ='img';
 /*  @Input() elementType; */
 public  tipos= ['administrador', 'cliente', 'especialista', 'recepcionista'];
 public  especialidades= ['odontologo', 'cirujano', '-'];
 public turno = new miTurno("","","");
public hora:string ="";
  constructor( public dialogRef: MatDialogRef<TurnoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngAfterContentInit() {
  
  }
  onSubmitAlta(){
    this.dialogRef.close(this.turno);
  }
}
