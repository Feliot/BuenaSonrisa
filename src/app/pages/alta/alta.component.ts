import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { UserColServiceService } from '../../services/user-col-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserCol,miUserCol } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  public  tipos= ['auto', 'camioneta', 'camion'];
 public  usuario= new miUserCol();
  constructor(private storage: AngularFireStorage,
    private miUserColServ: UserColServiceService, private authRout: Router,
   private uss: UserColServiceService
    ) {
     }
  urlImage: Observable<string>;
  msjerror;
  public filePath: string;
  ngOnInit() {
  }
  onSubmitAlta(){
    this.usuario = this.uss.getUser();
    this.urlImage.subscribe(url => {
      this.usuario.foto = url;
      console.log(url);
      this.miUserColServ.addUsuario(this.usuario);
      this.authRout.navigate(['/home']);
    })
  /*   this.miUserColServ.addUsuario(this.usuario);
    this.authRout.navigate(['/home']); */
     /* new Promise((resolve, reject) => {
      resolve(r=>this.miUserColServ.addUsuario(this.usuario))
    , err=> reject(err)}).then(r=> {console.log(this.usuario) */
     /* this.authRout.navigate(['/home'] })*/
   /*  .catch(err=>this.msjerror = err) */
 
  }
  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file =  e.target.files[0];
    this.filePath = `upload/image${id}.jpg`;
    this.usuario.foto = this.filePath;
    console.log('Archivo', e.target.files[0], "filepath",this.filePath);
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    task.snapshotChanges().pipe(finalize( () => this.urlImage = ref.getDownloadURL())).subscribe(
    );//url imagen
    console.log('Uploaded a blob or file!');
  }
  borrarImagen(){
    var storageRef = this.storage.storage.ref();
    var desertRef = storageRef.child(this.filePath);
    desertRef.delete().then(function(){
      //se eliminó la imagen
      console.log("Foto aliminada correctamente!")
    })
    .catch(err=> this.msjerror = err)
  }
}
