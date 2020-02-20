import { Component, OnInit, AfterContentInit,   } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario, miUsuario, UserCol , miUserCol} from 'src/app/models/usuario';
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
  private Listado: miTurno[];
  public usuario= new miUserCol("","","","");
  private myturno = new miTurno();
  constructor( private usersS:UserColServiceService,
    private turnoS:TurnoServiceService,
    private miAuth : UserServiceService,
    public dialog: MatDialog) {
    
    /* this.Listado.push(new miConsultorio('','','')); */
   }

  ngAfterContentInit() {
    this.usersS.GetUsersFiltro(this.miAuth.getUser().email, 'email' )
    .subscribe(r=>{
     /*  console.log(r[0].tipo); */
      this.usersS.setUser(r[0]);
      
      if(r[0].tipo === 'administrador'){
        this.turnoS.GetTurnos().subscribe(
          listado=> {this.Listado = listado;
            this.usuario= r[0];
            /* console.log(listado) */;})
      }
      else if(r[0].tipo === 'especialista'){
        this.turnoS.GetTurnosFiltro(this.miAuth.getUser().email,'especialista').subscribe(
          listado=> {this.Listado = listado;
            this.usuario= r[0];
          /* console.log(listado) */;})
      }
      else{
        this.turnoS.GetTurnosFiltro(this.miAuth.getUser().email,'usuario').subscribe(
          listado=> {this.Listado = listado;
            this.usuario= r[0];
          /* console.log(listado) */;})
      }
 
   /*   this.vechiculoS.GetUsersFiltro(this.myConsultorio.razonsocial, "concesionaria").subscribe(
      listado=> {this.Listado = listado;
      }
    ) */
    })
}

  
generarTurno(e) {
  const dialogRef = this.dialog.open(TurnoComponent);
  dialogRef.afterClosed().subscribe(data => {
    data != undefined ? this.turnoS.addTurno(data):console.log(`Turno revocado`);
  });
/*    console.log(`Dialog result: ${data}`); console.log(this.text_qr); */
}

getTurnos(){
return this.Listado as Turno[];
}

}
