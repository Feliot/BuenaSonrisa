import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Turno, miTurno } from '../models/sonrisa'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurnoServiceService {
  turnosCollection : AngularFirestoreCollection<Turno>;
  turnos: Observable<Turno[]>;
  turnoDoc: AngularFirestoreDocument<Turno>;
  turno: Turno = {};
  listadoDeturnos: Turno[];
  constructor(public db: AngularFirestore) {
    /* this.turnos = this.db.collection('turnos').valueChanges(); */
    this.turnosCollection = this.db.collection('turnos');

    this.turnos = this.turnosCollection.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as Turno;
         data.id = a.payload.doc.id;
        return { ...data};
      })
    ),);
  }
  GetTurnos(){
    /*   console.log(this.turnos); */
      /* return this.turnos = this.turnos */
        return this.turnos = this.turnosCollection.snapshotChanges().pipe(map(actions=>{
          return actions.map(a =>{
            const data= a.payload.doc.data() as Turno;
            data.id = a.payload.doc.id;
            /* console.log( a.payload.doc.id); */
            return  { ...data};
          })
        }),)
    }
    GetTurnosFiltro(  filtro: string,  campo:string){
      /* console.log(filtro, campo); */
      if(!filtro){filtro = "";}
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      return  this.turnos = this.db.collection('turnos', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as Turno;
           data.id = a.payload.doc.id;
       /*   console.log(data.id); */
          console.log( a.payload.doc.id);
          return { ...data};
        })
      }),)
      }
   DevolverTurnoFiltro(filtro: string,  campo:string){
        return new Promise((resolve, reject) => {
      resolve(this.GetTurnosFiltro(filtro, campo)), err=> reject(err)})
      }


    getTurnosSC(){
      return new Promise((resolve, reject) => {
        resolve(this.turnos.subscribe(turno=>
          {this.listadoDeturnos.push(turno as Turno) ;
        }))
        , err=> reject(err)})
      }
  setTurno(us :Turno){
        this.turno= us;
        console.log(this.turno);
      }

    getTurno(){
        return this.turno;
      }  
    getListTurnos(){
      return this.listadoDeturnos;
    }
    addTurno(turno: Turno){
        const param = JSON.parse(JSON.stringify(turno));
        console.log(param);
        this.turnosCollection.add(param);
    }
    deleteTurno(turno: Turno){
     /*  console.log(turno); */
      if (confirm("¿Realmente desea eliminar el Turno?")){
      this.turnoDoc= this.db.doc(`turnos/${turno.id}`);
      /* console.log(turno.id); */
      this.turnoDoc.delete();
      }
    }
    deleteTurnoxId(id: String){
      if (confirm("¿Realmente desea eliminar el Turno?")){
      this.turnoDoc= this.db.doc(`turnos/${id}`);
      /* console.log(this.turnoDoc); */
      this.turnoDoc.delete();
      }
    }
    updateTurno(turno:Turno){
        this.turnoDoc= this.db.doc(`turnos/${turno.id}`);
        this.turnoDoc.update(turno);
    }
}
