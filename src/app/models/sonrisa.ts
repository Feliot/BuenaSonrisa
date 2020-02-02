export interface Consultorio{
    sala?: string;
    de_8_a_11?: string;
    de_12_a_15?: string;
    de_16_a_19?: string;
}
export class miConsultorio implements Consultorio {
    constructor(public sala?:string, public de_8_a_11?: string,
        public de_12_a_15?: string, public de_16_a_19?: string){
    }
}
export interface Turno{
    id?:string;
    estado?:string;
    fecha?:string;
    hora?:string;
    usuario?:string;
    profecional?:string;
    sala?:string;
}
export class miTurno implements Turno {
    constructor(public estado?: string, public fecha?:string,
        public hora?: string, public usuario?: string,
        public profecional?:string,
        public sala?:string){
    }
}
export interface Reseña{
    id?:string;
    profesional?:string;
    foto?:string;
    nota?:number;
    fecha?:string;
    hora?:string;
    comentario?:string;
}
export class miReseña implements Reseña {
    constructor( public profesional?: string, public foto?:string,
        public nota?: number, public fecha?:string,public hora?:string , public comentario?:string ){
    }
}
export interface Encuesta{
    id?:string;
    nota_clinica?:number;
    nota_especialista?:number;
    comentario?:string; 
}
export class miEncuesta implements Encuesta{
    constructor(public nota_clinica?:number, public nota_especialista?:number,
         public comentario?:string){
    }
}
