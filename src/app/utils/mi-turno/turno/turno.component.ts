import { Component, OnInit, Input, AfterContentInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements AfterContentInit {
  @Input() text_qr;
  elementType ='img';
 /*  @Input() elementType; */


  constructor( public dialogRef: MatDialogRef<TurnoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngAfterContentInit() {
  
  }

}
