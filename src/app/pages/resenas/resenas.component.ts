import { Component, OnInit } from '@angular/core';
import { Consultorio, miConsultorio,Reseña, miReseña } from 'src/app/models/sonrisa';
import { miUserCol, UserCol } from 'src/app/models/usuario';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ResenaServiceService } from 'src/app/services/resena-service.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent implements OnInit {
  public Listado: miReseña[];
  public reseña = new miReseña('');
  public arrayUsuario;
  constructor(public resS:ResenaServiceService ) { }

  ngOnInit() {
    this.arrayUsuario = Object.keys(this.reseña);
     /* this.arrayUsuario.push("Acciones"); */
     this.resS.GetUsers().subscribe(
     listado=> {this.Listado = listado} 
  ) }
  
  getUsuarios(){
    return this.Listado as miReseña[];
  }

  
  public exportarPDF() {
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
      /* generate worksheet */
  /* generate workbook and add the worksheet */
  //Libreria https://github.com/SheetJS/sheetjs
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(this.Listado)
  XLSX.utils.book_append_sheet(wb, ws, 'test')
  XLSX.writeFile(wb, 'usuarios.csv')
  }
}
