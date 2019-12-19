import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';
import { VehiculoServiceService } from 'src/app/services/vehiculo-service.service';
import { Consultorio, miConsultorio } from 'src/app/models/sonrisa';
import { miUserCol, UserCol } from 'src/app/models/usuario';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  public  tipos= ['administrador', 'cliente', 'especialista', 'recepcionista'];
  public  especialidades= ['odontologo', 'cirujano', '-'];
  public  Listado: miUserCol[];
  public usuario = new miUserCol('');
  public arrayUsuario;
  public usuarios;
  private myUserCol = new miUserCol();
  constructor( private vechiculoS:VehiculoServiceService, 
    private usersS: UserColServiceService,
    private miAuth : UserServiceService) { }

  ngOnInit() {
    this.arrayUsuario = Object.keys(this.usuario);
    this.arrayUsuario.push("Acciones");
    this.usersS.GetUsers().subscribe(
     listado=> {this.Listado = listado}
  )}
  
  getUsuarios(){
    return this.Listado as miUserCol[];
  }
  actualizar(a){
/*     console.log(a); */
    this.usersS.updateUser(a);
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
