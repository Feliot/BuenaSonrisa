import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';
import { VehiculoServiceService } from 'src/app/services/vehiculo-service.service';
import { Consultorio, miConsultorio } from 'src/app/models/sonrisa';
import { miUserCol, UserCol } from 'src/app/models/usuario';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  public  Listado: UserCol[];
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
  
}
