import { Output, ElementRef, ViewChild, AfterContentInit, OnInit} from '@angular/core';
import { Component, Input} from '@angular/core';
/* import * as jsPDF from 'jspdf'; */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QrcodeComponent } from 'src/app/utils/mi-qrcode/qrcode/qrcode.component';
import { miTurno } from 'src/app/models/sonrisa';

@Component({
  selector: 'app-form-datos',
  templateUrl: './form-datos.component.html',
  styleUrls: ['./form-datos.component.css']
})

export class FormDatosComponent implements AfterContentInit {
  public qrCodeImagen="";
@ViewChild('contenido', {static: false}) contenidoRef: ElementRef;
public Buscar="";
  public turno = new miTurno('','');
/*   private posisionUid = this.arrayTurnos.indexOf('uid');
  columnsToDisplay: string[] = this.arrayTurnos.slice(0, this.posisionUid); */
 public arrayTurnos;
 public  text_qr: string ;
 public elementType: string;
  constructor(public dialog: MatDialog) {
   }
   @Input() turnos;

  ngAfterContentInit(){
    /* this.contenidoRef.nativeElement.focus(); */
 /*    console.log(this.turnos); */
    //Si es un objeto
/*     Object.keys(this.turnos); */
    this.arrayTurnos = Object.keys(this.turno);
    this.arrayTurnos.push("Acciones");
  }
  openDialog(e) {
    this.text_qr= e;
    const dialogRef = this.dialog.open(QrcodeComponent, {
      width: 'auto',
      height: 'auto',
      data:{
        text_qr: this.text_qr
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
/*     console.log(this.text_qr); */
  }

   // exportarPDF
   public exportarPDF() {
    let doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'A4'
    });
    doc.setFontSize(22);
    doc.setFontStyle('cursiva');
    doc.text('Listado de Turnos', 240, 30);

    doc.autoTable({html:"#miTabla",
    headStyles :{minCellHeight :15, haling:'center'},
    bodyStyles :{minCellHeight :15, haling:'center', fillColor: [0, 250, 0], textColor: [0, 20, 255]}
  });
    doc.save('Turnos.pdf');
  }
  exportarCSV(){
      /* generate worksheet */
  /* generate workbook and add the worksheet */
  //Libreria https://github.com/SheetJS/sheetjs
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(this.turnos)
  XLSX.utils.book_append_sheet(wb, ws, 'test')
  XLSX.writeFile(wb, 'turnos.csv')
  }
    
}
