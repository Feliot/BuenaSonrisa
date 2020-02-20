import { Component, OnInit, Input, AfterContentInit, ViewChild, Inject, ɵConsole } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { miTurno , variables_publicas} from 'src/app/models/sonrisa';
import { UserCol} from 'src/app/models/usuario'
import { UserColServiceService } from 'src/app/services/user-col-service.service';
import { Observable } from 'rxjs';
import { TurnoServiceService } from 'src/app/services/turno-service.service';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements AfterContentInit {
  @Input() text_qr;
  elementType ='img';
 /*  @Input() elementType; */
 public $profecionales:Observable<UserCol[]>;
 public  tipos= ['administrador', 'cliente', 'especialista', 'recepcionista'];
 public  especialidades= new variables_publicas().especialidades;
 public horarios = new variables_publicas().horariosH;


 public turno = new miTurno("","","","");
public hora:string ="";
  constructor( public dialogRef: MatDialogRef<TurnoComponent>, public uss: UserColServiceService,
    public ts: TurnoServiceService,
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
     if(this.turno.especialidad){
      this.$profecionales=this.uss.GetUsersFiltro(this.turno.especialidad.toString(), 'especialidad');
    } 
  }

  onSubmitAlta(){
    this.turno.usuario= this.uss.getUser().email;
    this.turno.estado= 'pendiente';
    this.turno.sala= (this.especialidades.indexOf(this.turno.especialidad.toString())+1).toString()
    this.dialogRef.close(this.turno);
  }
  selectE(){
    /* console.log(this.turno); */
    this.turno.profecional= null;
    this.$profecionales=this.uss.GetUsersFiltro(this.turno.especialidad.toString(), 'especialidad');
  }
  seleccionDia(dia: MatDatepickerInputEvent<Date>){
    if (dia.target.value.getDay()==6){
      this.horarios = new variables_publicas().horariosNH;
    }else{
      this.horarios = new variables_publicas().horariosH;
    }
    console.log(dia.target.value.getDay());
   /*  this.horarios = new variables_publicas().horariosNH; */
  }
}