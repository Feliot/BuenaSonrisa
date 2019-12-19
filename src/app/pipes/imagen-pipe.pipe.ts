import { Pipe, PipeTransform } from '@angular/core';
import { ArchivosService } from '../services/archivos.service';
@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {
  private archivoServices: ArchivosService
  transform(value: string, arg: any): any {
    return  this.archivoServices.darRutaImagen(arg) ;
  }

}
