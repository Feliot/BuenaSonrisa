import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario, miUsuario, miUserCol, UserCol } from 'src/app/models/usuario';
import { UserColServiceService } from 'src/app/services/user-col-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  token;
  public myUsuario : Usuario;
  public myUserCol: UserCol;
  public isAdmin : boolean;
  public isLogin : boolean;
  public isCliente : boolean;
  public isEspecialista : boolean;
  constructor(private miAuth: UserServiceService, private usersS: UserColServiceService){
    this.myUserCol  = new miUserCol("","","","");
    if (localStorage.getItem('token')) {
    this.token= localStorage.getItem('token');
    }
  }
  ngOnInit(){
    this.miAuth.getAuth()
    .subscribe(user =>{
      if(user){
      /*   this.miAuth.generarToken(); */
       
     /*    console.log("isLogin = true", user.email); */
      /*   this.myUsuario  =new miUsuario(user.uid, user.email); */
        this.myUsuario  = new miUsuario(user.email);
        this.myUserCol  = new miUserCol(user.email,"","","");
        /* this.usersS. */
        this.miAuth.cargarUsuario(user.email);
        this.usersS.GetUsersFiltro(user.email, 'email')
            .subscribe(r=>{
              this.usersS.setUser(r[0]);
             this.myUserCol= this.usersS.getUser();
             console.log(this.myUserCol.tipo)
             if (this.myUserCol.tipo == 'administrador'){ 
               this.isAdmin = true;}
              else if(this.myUserCol.tipo == 'especialista'){
                this.isEspecialista= true;
              }
              else if(this.myUserCol.tipo == 'cliente'){
                this.isCliente= true;
              }
             else{this.isAdmin = false;
              this.isEspecialista= false;
              this.isCliente= false;}
            })
           console.log(this.myUsuario);
           this.isLogin = true;
          
          
        if(!user.email){
        }else{
          this.myUsuario.email =  user.email;
/*           this.myUsuario.displayName= user.displayName;
          this.myUsuario.photoURL= user.photoURL; */
        }
       /*  this.myUsuario.id = user.uid; */

       }else{
        console.log("isLogin = false");
        this.isLogin = false;
        this.isAdmin = false;
        this.isCliente= false;
        this.isEspecialista= false;
      }
    })
  }
  logueado(){
    return this.miAuth.isAutenticated();
  }
  onClickLogout(){
    this.miAuth.logOut();
    this.isLogin= false;
    this.myUsuario = null;
  }

}
