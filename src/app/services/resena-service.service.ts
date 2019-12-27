import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserCol, Usuario } from '../models/usuario'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reseña, miReseña } from '../models/sonrisa';

@Injectable({
  providedIn: 'root'
})
export class ResenaServiceService {
  usuariosCollection : AngularFirestoreCollection<Reseña>;
  usuarios: Observable<Reseña[]>;
  usuarioDoc: AngularFirestoreDocument<Reseña>;
  user: Reseña = {};
  listadoDeUsuarios: Reseña[];
  constructor(public db: AngularFirestore) {
    this.usuariosCollection = this.db.collection('resenas');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as Reseña;
        const id = a.payload.doc.id;
        return { ...data};
      })
    ),);
  }
  GetUsers(){
    /*   console.log(this.usuarios); */
      /* return this.usuarios = this.usuarios */
        return this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
          return actions.map(a =>{
            const data= a.payload.doc.data() as Reseña;
            data.id = a.payload.doc.id;
            return data;
          })
        }),)
    }
    GetUsersFiltro(  filtro: string,  campo:string){
   /*    console.log(filtro, campo); */
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      return  this.usuarios = this.db.collection('resena', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as Reseña;
          return data;
        })
      }),)
      } 
      DevolverUsuarioFiltro(filtro: string,  campo:string){
        return new Promise((resolve, reject) => {
      resolve(this.GetUsersFiltro(filtro, campo)), err=> reject(err)})
      }


    getUsuariosSC(){
      return new Promise((resolve, reject) => {
        resolve(this.usuarios.subscribe(usuario=>
          {this.listadoDeUsuarios.push(usuario as Reseña) ;
        }))
        , err=> reject(err)})
      }
      getUser(){
        return this.user;
      }  
    getListUsers(){
      return this.listadoDeUsuarios;
    }

}
