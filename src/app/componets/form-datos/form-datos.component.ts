import { Output, ElementRef, ViewChild, AfterContentInit, OnInit} from '@angular/core';
import{ Usuario, miUsuario } from '../../models/usuario'
import{ UserCol, miUserCol } from '../../models/usuario'
import { Component, Input} from '@angular/core';
/* import * as jsPDF from 'jspdf'; */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QrcodeComponent } from 'src/app/utils/mi-qrcode/qrcode/qrcode.component';

@Component({
  selector: 'app-form-datos',
  templateUrl: './form-datos.component.html',
  styleUrls: ['./form-datos.component.css']
})

export class FormDatosComponent implements AfterContentInit {
  public qrCodeImagen="";
@ViewChild('contenido', {static: false}) contenidoRef: ElementRef;
public Buscar="";
  public usuario = new miUserCol('','');
/*   private posisionUid = this.arrayUsuario.indexOf('uid');
  columnsToDisplay: string[] = this.arrayUsuario.slice(0, this.posisionUid); */
 public arrayUsuario;
 public  text_qr: string ;
 public elementType: string;
  constructor(public dialog: MatDialog) {
   }
   @Input() usuarios;

  ngAfterContentInit(){
    /* this.contenidoRef.nativeElement.focus(); */
 /*    console.log(this.usuarios); */
    //Si es un objeto
/*     Object.keys(this.usuarios); */
    this.arrayUsuario = Object.keys(this.usuario);
    this.arrayUsuario.push("Acciones");
  }
  openDialog(e) {
    const dialogRef = this.dialog.open(QrcodeComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.text_qr= e;
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
    doc.text('Listado de Concesionarias', 240, 30);
    let manejadorEspecial = {
      '#editor': function(element, renderer){
        return true;
      }
    }
    doc.autoTable({head:"#titulo",html: "#cuerpo"});
    doc.save('Concesionarias.pdf');
  }
  exportarCSV(){
    /* generate worksheet */
/* generate workbook and add the worksheet */
//Libreria https://github.com/SheetJS/sheetjs
const wb = XLSX.utils.book_new()
const ws = XLSX.utils.json_to_sheet(this.usuarios)
XLSX.utils.book_append_sheet(wb, ws, 'test')
XLSX.writeFile(wb, 'Concesionarias.csv')

  }
    
}
/* @Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {} */