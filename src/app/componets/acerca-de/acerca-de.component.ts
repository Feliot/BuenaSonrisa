import { Component, AfterContentInit , OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements AfterContentInit {

  constructor( public dialogRef: MatDialogRef<AcercaDeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngAfterContentInit() {
  }
  cerrar(){
    this.dialogRef.close('Muchas gracias por leerme.');
  }
}
