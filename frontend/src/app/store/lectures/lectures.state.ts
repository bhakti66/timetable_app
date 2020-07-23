import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap, flatMap } from "rxjs/operators";

import { map } from "rxjs/operators";
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { LectureStateModel } from './lectures-state.model';
import { GetLectures } from './lectures.action';
import { LectureService } from '../../services/lecture.service';


@State<LectureStateModel>({
  name: "lecture",
  defaults: {}
})
export class LectureState {
  constructor(private lectureService: LectureService, private http: HttpClient) { }

  @Action(GetLectures)
  getLectures(ctx: StateContext<LectureStateModel>) {
    return this.lectureService.getLectures().pipe(
      tap(results => {
        ctx.patchState({ lectures: results['data'] });
      }, (err) => {
        ctx.patchState({ lectures: [] });
      })
    );
  }

}