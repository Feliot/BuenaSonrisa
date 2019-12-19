import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { miUsuario, Usuario, UserCol, miUserCol } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';
import { UserColServiceService } from 'src/app/services/user-col-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public  email: string ="";
  public  password: string ="" ;
  public user: Usuario;
  public userCol: UserCol;
  public bactivate : boolean;
  public bimagen: boolean =false;
  public msjerror: string ;

  constructor(private miAuth: UserServiceService, 
    private authRout: Router,
     private storage: AngularFireStorage,
     private miUCS: UserColServiceService) { }
 public urlImage: Observable<string>;
 public url: string = "";
public filePath: string ;
  ngOnInit() {
    this.miAuth.getAuth()
    .subscribe(user =>{
      this.user = user;
    })
  }
  onSubmitRegister(){
        this.miAuth.register(this.email, this.password)
        .then(res => {
          this.urlImage.subscribe(url => {
            this.userCol= new miUserCol(this.email,url,"cliente","")
            this.miUCS.addUsuario(this.userCol);
            /* ActualizarPerfil("admin", url).then( e => { */
              this.authRout.navigate(['/home'])}
          )
        })
        .catch( err => this.msjerror = err );
    }

    navigar(){
      this.authRout.navigate(['/home']);
    }
    onUpload(e){
      const id = Math.random().toString(36).substring(2);
      const file =  e.target.files[0];
      this.filePath = `upload/image${id}.jpg`;
      console.log('Archivo', e.target.files[0], "filepath",this.filePath);
      const ref = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, file);
      task.snapshotChanges().pipe(finalize( () => this.urlImage = ref.getDownloadURL())).subscribe(ee=>{
        this.bimagen= true;
        this.validarCamposIngreso();
      });//url imagen
      console.log('foto subida Correctamente!');
    }
    borrarImagen(){
      var storageRef = this.storage.storage.ref();
      var desertRef = storageRef.child(this.filePath);
      desertRef.delete().then(function(){
        console.log("Foto aliminada correctamente!");
      })     
      .catch(err=> this.msjerror = err)
      this.bimagen= false;
      this.validarCamposIngreso();
      this.urlImage = this.storage.ref("upload/image.png").getDownloadURL();
    }
    onNoBorrar(){
      this.msjerror= "Debe cargar una imagen!!";
    }
    onMensaje(){
      this.msjerror= "Debe completar todos los campos!!";
    }
    validarCamposIngreso(){
      /* console.log("Validando campos", this.email.length, this.password.length); */
     if (this.email.length  > 6  || this.password.length > 5){
      if(this.email.toLowerCase().indexOf("@")> 0 && this.email.toLowerCase().indexOf(".com") > 0){
        if ( this.password.length > 5){
          if(this.bimagen){
            this.bactivate = true;
            this.msjerror="";
          }else{
            this.bactivate = false;
            this.msjerror="Debe subir una foto!"
          }
        }else{
          this.bactivate = false;
          this.msjerror="Clave debe tener mas de 6 dígitos!!"
        }
      } else{
        this.bactivate = false;
        this.msjerror="Email Invalido!!"
      }
     }else{
      this.bactivate = false;
     }
    }
    
}
/* rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
} */