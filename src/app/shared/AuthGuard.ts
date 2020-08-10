import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {map, mergeMap, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  /**
   * Checks both the local storage and the server for the login state. Both must be OK.
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedIn()
      .pipe(take(1), map(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
          }
          return isLoggedIn;
        }),
        mergeMap(() => this.loginService.getServerSession()
          .pipe(map(session => {
              if (!session || session.organizationId == null) {
                this.router.navigate(['/login']);
                return false;
              }
              return true;
            }
          ))));
  }
}
