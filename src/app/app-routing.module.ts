import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AltaComponent } from './pages/alta/alta.component';
import { GrillaComponent } from './pages/grilla/grilla.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AtTurnosComponent } from './pages/at-turnos/at-turnos.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { MaterialModule } from './material';


const routes: Routes = [ {path: 'home', component: HomeComponent,
canActivate:[ AuthGuard] /* ,
children:[
  {path: 'qr', component: 'asd'}
] */},
{path: 'login', component: LoginComponent},
{path: 'admin', component: AdminComponent ,canActivate:[ AuthGuard]},
{path: 'atenderTurnos', component: AtTurnosComponent ,canActivate:[ AuthGuard]},
{path: 'reseñas', component: ResenasComponent ,canActivate:[ AuthGuard]},
{path: 'register', component: RegisterComponent},
{path: 'alta', component: AltaComponent, canActivate:[ AuthGuard]},
{path: 'grilla', component: GrillaComponent, canActivate:[ AuthGuard]},
{path: '', redirectTo : 'home' , pathMatch: 'full'},
{path: '**', component :  ErrorComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent
  ,ErrorComponent,
    LoginComponent, RegisterComponent, AltaComponent, GrillaComponent]
