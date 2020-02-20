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
    especialidad?: String;
    sala?:string;
}
export class miTurno implements Turno {
    constructor( public estado?: string, public fecha?:string,
        public hora?: string, public usuario?: string,
        public profecional?:string,public especialidad?: String,
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
export class variables_publicas{
    public especialidades= ['cirugia',
    'endodoncia',
    'estomatologia',
    'gral y protesis',
    'odontologia',
    'odontopeditria',
    'ortopedia y ortodoncia',
    'periodoncia',
    'protesis completas',
    'radiologia'];
    public horariosH = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
    public horariosNH = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00']
}  

export interface Encuesta{
    id?:string;
    usuario?:string;
    clinica?:string;
    nota_clinica?:number;
    especialista?:string;
    nota_especialista?:number;
    comentario?:string;
}
export class miEncuesta implements Encuesta{
    constructor(public nota_clinica?:number, public nota_especialista?:number,
         public comentario?:string){
    }
}
