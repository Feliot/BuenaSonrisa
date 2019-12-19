import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserCol, Usuario } from '../models/usuario'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserColServiceService {
  usuariosCollection : AngularFirestoreCollection<UserCol>;
  usuarios: Observable<UserCol[]>;
  usuarioDoc: AngularFirestoreDocument<UserCol>;
  user: UserCol = {};
  listadoDeUsuarios: UserCol[];
  constructor(public db: AngularFirestore) {
    /* this.usuarios = this.db.collection('usuarios').valueChanges(); */
    this.usuariosCollection = this.db.collection('UserCols');

    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as UserCol;
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
            const data= a.payload.doc.data() as UserCol;
            data.id = a.payload.doc.id;
            return data;
          })
        }),)
    }
    GetUsersFiltro(  filtro: string,  campo:string){
   /*    console.log(filtro, campo); */
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      return  this.usuarios = this.db.collection('UserCols', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as UserCol;
   /*        data.id = a.payload.doc.id;
          console.log(data.id); */
/*           console.log( a.payload.doc.id); */
          return data;
        })
      }),)
      } 
    updateUser(user1:UserCol){
     /*  console.log(this.user.email); */
     this.db.collection('UserCols').doc(user1.id).update(user1);
    /*  console.log(this.user.email); */
    }

   DevolverUsuarioFiltro(filtro: string,  campo:string){
        return new Promise((resolve, reject) => {
      resolve(this.GetUsersFiltro(filtro, campo)), err=> reject(err)})
      }


    getUsuariosSC(){
      return new Promise((resolve, reject) => {
        resolve(this.usuarios.subscribe(usuario=>
          {this.listadoDeUsuarios.push(usuario as UserCol) ;
        }))
        , err=> reject(err)})
      }
  setUser(us :UserCol){
        this.user= us;
/*         console.log(this.user); */
      }

    getUser(){
        return this.user;
      }  
    getListUsers(){
      return this.listadoDeUsuarios;
    }
/*
    deleteUsuario(usuario: Usuario){
      if (confirm("¿Realmente desea eliminar el Usuario?")){
      this.usuarioDoc= this.db.doc(`usuarios/${usuario.id}`);
      console.log(this.usuarioDoc);
      this.usuarioDoc.delete();
      }
    } */
    addUsuario(usuario: UserCol){
       /*  this.usuariosCollection.add(usuario); */
        const param = JSON.parse(JSON.stringify(usuario));
        console.log(param);
        this.usuariosCollection.add(param);
    }
/*     updateUsuario(usuario:Usuario){
      this.usuarioDoc= this.db.doc(`usuarios/${usuario.id}`);
      this.usuarioDoc.update(usuario);
    } */

}
