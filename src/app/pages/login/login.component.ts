/* import { CaptchaComponent } from './../../utils/mi-captcha/captcha/captcha.component'; */
import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { miUsuario, Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Usuario;
public bactivate : boolean;
public msjerror: string ;
public email: string;
public password: string ;
/* public miemail = new FormControl('', [Validators.required, Validators.email]); */
/*   getErrorMessage() {
    return this.miemail.hasError('required') ? 'You must enter a value' :
        this.miemail.hasError('miemail') ? 'Not a valid email' :
        '';
  } */
  constructor(private miAuth: UserServiceService, private authRout: Router) {
  }
  resolved(e){
    console.log("Captcha resuelto", e);
  }

  ngOnInit() {
    this.miAuth.getAuth()
    .subscribe(user =>{
      this.user = user;
    })
  }
  activar(e){
    console.log("bActiate ", e);
    this.bactivate= e;
  }
  noActivado(){
    console.log("No activado");
  }

onSubmitLoginPublic(){
  this.email= 'publico@publico.com';
  this.password= '123456';
  this.onSubmitLogin();
}
cargarCliente(){
  this.email= 'cliente@cliente.com';
  this.password= '123456';
}
cargarRecepcionista(){
  this.email= 'recepcionista@recepcionista.com';
  this.password= '123456';
}
cargarEspecialista(){
  this.email= 'especialista@especialista.com';
  this.password= '123456';
}
cargarAdmin(){
  this.email= 'admin@admin.com';
  this.password= '123456';
}
  onSubmitLogin(){
/*     this.miAuth.login(this.email, this.password)
    .then((res) =>{
      this.authRout.navigate(['/home'])
    }).catch((err) => {
      console.log(err);
      this.msjerror= err;
    }); */
    this.miAuth.login(this.email, this.password)
    .then(res => {
      console.log("logueando, yendo a casa");
      this.authRout.navigate(['/home']);
    })
    .catch( err => this.msjerror= err)
  }
  onMensaje(){
    this.msjerror= "Ingreso solo con Captcha";
  }
}

