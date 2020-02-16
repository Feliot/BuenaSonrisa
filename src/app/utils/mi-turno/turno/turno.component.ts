import { Component, OnInit, Input, AfterContentInit, ViewChild, Inject, ɵConsole } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { miTurno } from 'src/app/models/sonrisa';
import { UserColServiceService } from 'src/app/services/user-col-service.service';


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
 public horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']


 public turno = new miTurno("","","");
public hora:string ="";
  constructor( public dialogRef: MatDialogRef<TurnoComponent>, public uss: UserColServiceService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }
    dateClass = (d: Date) => {
      const date = d.getDate();
      // Highlight the 1st and 20th day of each month.
       var dev = undefined ;
       if(date === 1 || date === 20){
        dev= 'example-custom-date-class' }
         else{
        dev=  undefined;
         } 
         return dev
    }
    minDate = new Date();
    myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0;
    }
  ngAfterContentInit() {
  
  }
  onSubmitAlta(){
    this.turno.usuario= this.uss.getUser().email;
    this.dialogRef.close(this.turno);
  }
}
