import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encuesta, miEncuesta } from '../models/sonrisa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncuestaServiceService {
encuestaColletion : AngularFirestoreCollection<Encuesta>;
  encuestas: Observable<Encuesta[]>;
  /* encuestaDoc: AngularFirestoreDocument<Encuesta>; */
  encuesta: Encuesta = {};
  listadoDeencuestas: Encuesta[];
  constructor(public db: AngularFirestore) {
    /* this.encuestas = this.db.collection('encuestas').valueChanges(); */
    this.encuestaColletion = this.db.collection('Encuestas');

    this.encuestas = this.encuestaColletion.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as Encuesta;
        const id = a.payload.doc.id;
        return { ...data};
      })
    ),);
  }

  GetEncuestas(){
        return this.encuestas = this.encuestaColletion.snapshotChanges().pipe(map(actions=>{
          return actions.map(a =>{
            const data= a.payload.doc.data() as Encuesta;
            data.id = a.payload.doc.id;
            return data;
          })
        }),)
    }
    GetEncuestasFiltro(  filtro: string,  campo:string){
   /*    console.log(filtro, campo); */
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      return  this.encuestas = this.db.collection('Encuestas', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as Encuesta;
   /*        data.id = a.payload.doc.id;
          console.log(data.id); */
/*           console.log( a.payload.doc.id); */
          return data;
        })
      }),)
      } 
    updateEncuesta(encuesta1:Encuesta){
     /*  console.log(this.encuesta.email); */
     this.db.collection('Encuestas').doc(encuesta1.id).update(encuesta1);
    /*  console.log(this.encuesta.email); */
    }

   DevolverEncuestaFiltro(filtro: string,  campo:string){
        return new Promise((resolve, reject) => {
      resolve(this.GetEncuestasFiltro(filtro, campo)), err=> reject(err)})
      }


    getEncuestasSC(){
      return new Promise((resolve, reject) => {
        resolve(this.encuestas.subscribe(usuario=>
          {this.listadoDeencuestas.push(usuario as Encuesta) ;
        }))
        , err=> reject(err)})
      }
  setEncuesta(us :Encuesta){
        this.encuesta= us;
/*         console.log(this.encuesta); */
      }

    getEncuesta(){
        return this.encuesta;
      }  
    getListencuestas(){
      return this.listadoDeencuestas;
    }
    addEncuesta(encuenta: Encuesta){
        const param = JSON.parse(JSON.stringify(encuenta));
        console.log(param);
        this.encuestaColletion.add(param);
    }
}
