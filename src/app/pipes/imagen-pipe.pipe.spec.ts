import { ImagenPipePipe } from './imagen-pipe.pipe';
import { ArchivosService } from '../services/archivos.service';

describe('ImagenPipePipe', () => {
  it('create an instance', () => {
    const pipe = new ImagenPipePipe();
    expect(pipe).toBeTruthy();
  });
});
