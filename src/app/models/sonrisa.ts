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
    horario?:Date;
    usuario?:string;
    profecional?:string;
    sala?:string;
}
export class miTurno implements Turno {
    constructor(public id?:string, public estado?: string,
        public horario?: Date, public usuario?: string,
        public profecional?:string,
        public sala?:string){
    }
}
export interface Reseña{
    id?:string;
    profesional?:string;
    reseña?:number;
    fecha?:Date;
}
export class miReseña implements Reseña {
    constructor(public id?:string, public profesional?: string,
        public reseña?: number, public fecha?:Date ){
    }
}

