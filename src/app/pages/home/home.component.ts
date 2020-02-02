import { Component, OnInit, AfterContentInit  } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario, miUsuario, UserCol } from 'src/app/models/usuario';
import { Consultorio, miConsultorio , Turno, miTurno} from 'src/app/models/sonrisa';
import { TurnoServiceService } from 'src/app/services/turno-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';
/* import * as jsPDF from 'jspdf'; */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TurnoComponent } from 'src/app/utils/mi-turno/turno/turno.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentInit {
  private Listado=[];
  public usuario:UserCol;
  private myturno = new miTurno();
  constructor( private usersS:UserColServiceService,
    private turnoS:TurnoServiceService,
    private miAuth : UserServiceService,
    public dialog: MatDialog) {
    
    /* this.Listado.push(new miConsultorio('','','')); */
   }

  ngAfterContentInit() {

    this.usersS.GetUsersFiltro(this.miAuth.getUser().email , 'profecional')
    .subscribe(r=>{
      this.usersS.setUser(r[0]);
     this.myturno= this.turnoS.getTurno();
   /*   this.vechiculoS.GetUsersFiltro(this.myConsultorio.razonsocial, "concesionaria").subscribe(
      listado=> {this.Listado = listado;
      }
    ) */
    })


}

  
generarTurno(e) {
  const dialogRef = this.dialog.open(TurnoComponent);
  dialogRef.afterClosed().subscribe(data => {
    console.log(`Dialog result: ${data.fecha}`);
  });
/*     console.log(this.text_qr); */
}

 
getUsuarios(){
return this.Listado as Turno[];
}
}
