import { Component, OnInit } from '@angular/core';
import { Consultorio, miConsultorio,Reseña, miReseña, miTurno, Turno } from 'src/app/models/sonrisa';
import { miUserCol, UserCol } from 'src/app/models/usuario';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ResenaServiceService } from 'src/app/services/resena-service.service';
import { TurnoServiceService } from 'src/app/services/turno-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EncuestaComponent } from 'src/app/componets/encuesta/encuesta.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EncuestaServiceService } from 'src/app/services/encuesta-service.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent implements OnInit {
  public Listado: miTurno[];
  public usuario= new miUserCol("","","","");
  /* public turno:Turno= new miTurno(); */
  public titulos = ['Fecha','hora','Profecional','Especialidad','Usuario', 'Reseña','Acciones'];
  constructor(public turnoS:TurnoServiceService,public  encuestaS:EncuestaServiceService,
    private usersS:UserColServiceService,private miAuth : UserServiceService ,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.usersS.GetUsersFiltro(this.miAuth.getUser().email, 'email' )
    .subscribe(r=>{
      this.usersS.setUser(r[0]);
     /*  console.log(r[0].tipo); */
     if(r[0].tipo === 'administrador' || r[0].tipo === 'recepcionista'){
      this.turnoS.GetTurnosFiltro('atendido', 'estado').subscribe(
        listado=> {this.Listado = listado;
          this.usuario= r[0];
          /* console.log(listado) */;})
    }
    else if(r[0].tipo === 'especialista'){
      this.turnoS.GetTurnosDobleFiltro(this.miAuth.getUser().email,'profecional', 'atendido', 'estado').subscribe(
        listado=> {this.Listado = listado;
          this.usuario= r[0];
        /* console.log(listado) */;})
    }
    else{
      this.turnoS.GetTurnosDobleFiltro(this.miAuth.getUser().email,'usuario', 'atendido', 'estado').subscribe(
        listado=> {this.Listado = listado;
          this.usuario= r[0];
        /* console.log(listado) */;})
    }
  })
}
  
  getUsuarios(){
    return this.Listado as miTurno[];
  }
  encuesta(e){
    /* cerrar un turno y hacer su Reseña */
    const dialogRef = this.dialog.open(EncuestaComponent,{data:{
      turno: e
    }} );
    dialogRef.afterClosed().subscribe(data => {
      if(data != undefined){
        this.turnoS.updateTurno(data.turno);
        this.encuestaS.addEncuesta(data.encuesta)
      } else{console.log(`Encuesta revocada`);
    }
        
    });}
  /* public exportarPDF() {
    let doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'A4'
    });
    doc.setFontSize(22);
    doc.setFontStyle('cursiva');
    doc.text('Listado de Usuarios', 240, 30);

    doc.autoTable({html:"#miTabla",
    headStyles :{minCellHeight :15, haling:'center'},
    bodyStyles :{minCellHeight :15, haling:'center', fillColor: [0, 250, 0], textColor: [0, 20, 255]}
  });
    doc.save('Usuarios.pdf');
  }
  exportarCSV(){
      /* generate worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(this.Listado)
  XLSX.utils.book_append_sheet(wb, ws, 'test')
  XLSX.writeFile(wb, 'usuarios.csv')
  } */


   exportarPDF() {
    let doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'A4'
    });
    doc.setFontSize(22);
    doc.setFontStyle('cursiva');
    doc.text('Listado de Reseñas', 240, 30);

    doc.autoTable({html:"#miTabla",
    headStyles :{minCellHeight :15, haling:'center'},
    bodyStyles :{minCellHeight :15, haling:'center', fillColor: [0, 250, 0], textColor: [0, 20, 255]}
  });
    doc.save('reseñas.pdf');
  }
  exportarCSV(){
      /* generate worksheet */
  /* generate workbook and add the worksheet */
  //Libreria https://github.com/SheetJS/sheetjs
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(this.Listado)
  XLSX.utils.book_append_sheet(wb, ws, 'test')
  XLSX.writeFile(wb, 'reseñas.csv')
  }
}
