export interface Usuario {
    email?: string;
    clave?: string;
    displayName?:string;
    photoURL?:string;
}
export class miUsuario implements Usuario {
    constructor( public email?: string, public clave?: string,
        public displayName?:string,public photoURL?:string){

    }
}
export interface UserCol {
    id?:string;
    email?: string;
    foto?: string;
    tipo?: string;
    especialidad?: string;
}
export class miUserCol implements UserCol {
    constructor(public email?:string,public foto?: string, public tipo?: string,
        public especialidad?: string){
    }
}