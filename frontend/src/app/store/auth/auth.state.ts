import { Injectable } from "@angular/core";
import { Login, CurrentUser, RegisterUser } from "./auth.action";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { AuthStateModel } from "./auth-state.model"
import { tap, flatMap } from "rxjs/operators";

import { map } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';


@State<AuthStateModel>({
  name: "auth",
  defaults: {}
})
export class AuthState {
  constructor(private authService: AuthService, private http: HttpClient) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, { payload }: Login) {
    var body = {
      email: payload.email,
      password: payload.password
    }
    return this.http
      .post<any>(environment.apiUrl + `users/login`, body)
      .pipe(
        map(result => {
          // login successful if there's a jwt token in the response
          if (result && result.user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(result));
          }

          // return result;
        })
      );
  }


  @Action(RegisterUser)
  RegisterUser(ctx:StateContext<AuthStateModel>,payload:RegisterUser,isProfessor:boolean){
    return this.authService.registerUser(payload.payload,payload.isProfessor).pipe(
      tap(results=>{
        ctx.patchState({ user: results});
      },(err)=>{
        ctx.patchState({user:{}})
      })
    )
  }
}