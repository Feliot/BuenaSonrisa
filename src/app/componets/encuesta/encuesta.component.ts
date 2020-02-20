import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { miTurno, Turno, miEncuesta,Encuesta } from 'src/app/models/sonrisa';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements AfterContentInit {
public notas= ['1','2','3','4','5','6','7','8','9','10'];
  public turno:Turno = new miTurno("","","","");
  public encuesta:Encuesta = new miEncuesta()
  constructor( public dialogRef: MatDialogRef<EncuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }
 
    ngAfterContentInit() {
    this.turno= this.data.turno;
  }
  cerrar(){
    this.encuesta.usuario = this.turno.usuario;
    this.encuesta.especialista = this.turno.profecional;
    this.encuesta.clinica= this.turno.sala;
    this.turno.encuestado = "ok";
    this.data.encuesta= this.encuesta;
    this.data.turno= this.turno;
    this.dialogRef.close(this.data);
  }
}
