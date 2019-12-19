import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './componets/nav-bar/nav-bar.component';
import { FormDatosComponent } from './componets/form-datos/form-datos.component';
import { FilaComponent } from './componets/fila/fila.component';
import { UtilmoduleModule } from './utils/utilmodule.module';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AngularFireModule } from '@angular/fire';
import { ImagenPipePipe } from './pipes/imagen-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    routingComponents,
    FormDatosComponent,
    FilaComponent,
    FilterPipe,
    ImagenPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    PagesModule,
    FormsModule,
     ReactiveFormsModule,
     UtilmoduleModule,
     NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }

