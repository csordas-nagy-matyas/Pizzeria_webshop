import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService} from '../utils/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {  
      let result = await this.loginService.get_logged_user().toPromise(); 
      if(JSON.parse(result).accessLevel == 'basic' || JSON.parse(result).accessLevel == 'admin'){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {  
      let result = await this.loginService.get_logged_user().toPromise(); 

      if(JSON.parse(result).accessLevel == 'admin'){
        return true;
      }else if(JSON.parse(result).accessLevel == 'basic'){
        this.router.navigate(['/products']);
        return false;
      }else
      {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
