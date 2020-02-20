import { Component, OnInit , AfterContentInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { miTurno, Turno } from 'src/app/models/sonrisa';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent implements AfterContentInit {
  public estados= ['pendiente','atendido','cancelado'];
  public turno = new miTurno("","","","");
  constructor( public dialogRef: MatDialogRef<ResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }
 
    ngAfterContentInit() {
    this.turno= this.data.turno;
  }
  cerrar(){
    this.dialogRef.close(this.turno);
  }

}
