import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';
import { UserServiceService } from '../services/user-service.service';
import { UserColServiceService } from '../services/user-col-service.service';
import { Observer } from 'firebase';
import { UserCol } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private usuarioService: UserServiceService,
    private usersS: UserColServiceService,
   private afsAuth: AngularFireAuth) {
 }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if(!auth){
          this.router.navigate(['/login']);
        }
        else{
       /*    this.usuarioService.reCargarusuario(); */
          /* console.log('usuario',this.usuarioService.getUser()); */
          this.usuarioService.recargarYDevolverUsuario().then( /* e => console.log(e) */
           /*  this.usersS.GetUsersFiltro(this.usuarioService.getUser().email, 'email')
            .subscribe(r=>
             this.usersS.setUser(r[0]) 
            ) */
          
          )
           .catch(err => {console.log(err)
              this.router.navigate(['/login']);
            })
        }
      })
      );

    }
  }
