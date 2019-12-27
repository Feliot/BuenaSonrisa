import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Turno, miTurno } from '../models/sonrisa'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoServiceService {
  usuariosCollection : AngularFirestoreCollection<Turno>;
  usuarios: Observable<Turno[]>;
  usuarioDoc: AngularFirestoreDocument<Turno>;
  user: Turno = {};
  listadoDeUsuarios: Turno[];
  constructor(public db: AngularFirestore) {
    /* this.usuarios = this.db.collection('usuarios').valueChanges(); */
    this.usuariosCollection = this.db.collection('turnos');

    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as Turno;
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
            const data= a.payload.doc.data() as Turno;
            data.id = a.payload.doc.id;
            return data;
          })
        }),)
    }
    GetUsersFiltro(  filtro: string,  campo:string){
      console.log(filtro, campo);
      if(!filtro){filtro = "";}
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      return  this.usuarios = this.db.collection('turnos', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as Turno;
           data.id = a.payload.doc.id;
      /*    console.log(data.id); */
          /* console.log( a.payload.doc.id); */
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
          {this.listadoDeUsuarios.push(usuario as Turno) ;
        }))
        , err=> reject(err)})
      }
  setUser(us :Turno){
        this.user= us;
        console.log(this.user);
      }

    getUser(){
        return this.user;
      }  
    getListUsers(){
      return this.listadoDeUsuarios;
    }
    addUsuario(usuario: Turno){
        const param = JSON.parse(JSON.stringify(usuario));
        console.log(param);
        this.usuariosCollection.add(param);
    }
}
