import { Component, OnInit, AfterContentInit  } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario, miUsuario } from 'src/app/models/usuario';
import { Consultorio, miConsultorio } from 'src/app/models/sonrisa';
import { VehiculoServiceService } from 'src/app/services/vehiculo-service.service';
import { UserColServiceService } from 'src/app/services/user-col-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentInit {
  private Listado=[];
  private myConsultorio = new miUsuario();
  constructor( private vechiculoS:VehiculoServiceService, 
    private usersS: UserColServiceService,
    private miAuth : UserServiceService) {
    
    /* this.Listado.push(new miConsultorio('','','')); */
   }

  ngAfterContentInit() {
    this.miAuth.getAuth()
    .subscribe(user =>{
      if(user){
    this.usersS.GetUsersFiltro(user.email, 'email')
    .subscribe(r=>{
      this.usersS.setUser(r[0]);
     this.myConsultorio= this.usersS.getUser();
   /*   this.vechiculoS.GetUsersFiltro(this.myConsultorio.razonsocial, "concesionaria").subscribe(
      listado=> {this.Listado = listado;
      }
    ) */
    })
  }}
   /*  this.myUsuario.id = user.uid; */

)
}

/*    this.concecionaria = this.miconceS.getUser()
    console.log(this.concecionaria.razonsocial);
    this.vechiculoS.GetUsersFiltro(this.concecionaria.razonsocial, "concesionaria").subscribe(
      listado=> {this.Listado = listado;
      }
    ) */
    


 
getUsuarios(){
return this.Listado as Consultorio[];
}
}
