import { Injectable } from '@angular/core';
import { FirebaseStorage } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  
  constructor(private storage: FirebaseStorage) { }

darRutaImagen(dir:string){
// Create a storage reference from our storage service
var storageRef = this.storage.ref();
/* var imagesRef = storageRef.child('images'); */
// imagesRef now points to 'images'
// Child references can also take paths delimited by '/'
var spaceRef = storageRef.child(dir);
return spaceRef.toString();
  }
}
