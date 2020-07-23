import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators"
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn()
  }

  isLoggedIn() {
    //check if user is logged in by checking if the token is available in localstorage. If yes, then check if the token is valid.
    if (localStorage.getItem('currentUser')) {
      return true
    }
    return false
  }

  isAdmin(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.user.role['role_name']=="admin") {
      return true
    }
    return false
  }

  registerUser(payload,isProfessor){
    var body = {
      first_name : payload.first_name,
      last_name : payload.last_name,
      email : payload.email,
      password : payload.password,
      isProfessor : isProfessor
    }
    return this.http.post(environment.apiUrl+"users",body).pipe()
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("")
  }
}
