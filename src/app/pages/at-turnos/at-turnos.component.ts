import { Component, OnInit } from '@angular/core';
import { Consultorio, miConsultorio,Reseña, miReseña, miTurno } from 'src/app/models/sonrisa';
import { miUserCol, UserCol } from 'src/app/models/usuario';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ResenaServiceService } from 'src/app/services/resena-service.service';
import { TurnoServiceService } from 'src/app/services/turno-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-at-turnos',
  templateUrl: './at-turnos.component.html',
  styleUrls: ['./at-turnos.component.css']
})
export class AtTurnosComponent implements OnInit {
  public Listado: miTurno[];
  public usuario= new miUserCol("","","","");
  public titulos = ['Fecha','hora','Profecional','Especialidad','Usuario', 'Reseña'];
  constructor(public turnoS:TurnoServiceService, 
    private usersS:UserColServiceService,private miAuth : UserServiceService ) { }

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
  
}
