import { Component, OnInit, Input, AfterContentInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})

export class QrcodeComponent implements AfterContentInit {
 public text_qr; 
  elementType ='img';
 /*  @Input() elementType; */


  constructor( public dialogRef: MatDialogRef<QrcodeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterContentInit() {
    this.text_qr= this.data.text_qr;
  }
  closeModal(){
    this.dialogRef.close();
  }
}
