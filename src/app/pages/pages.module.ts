import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AppRoutingModule } from '../app-routing.module';
//Firebase
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import {  UserServiceService } from '../services/user-service.service';

/* import { UsuariosService } from '../services/usuarios.service'; */
import { MaterialModule } from '../material';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from '../pages/error/error.component';
import { AdminComponent } from './admin/admin.component';
import { AtTurnosComponent } from './at-turnos/at-turnos.component';
import { ResenasComponent } from './resenas/resenas.component';

@NgModule({
  declarations: [ AdminComponent, AtTurnosComponent, ResenasComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,MaterialModule
  ], 
  providers: [UserServiceService]
})
export class PagesModule { }
