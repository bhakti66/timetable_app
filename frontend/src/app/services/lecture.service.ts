import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators"
import { environment } from '../../environments/environment';
import { Lecture } from '../models/lectures';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(){
    return this.http.get<Lecture[]>(environment.apiUrl+"lectures").pipe();
  }

  getClasses(){
    return this.http.get<Lecture[]>(environment.apiUrl+"classes").pipe();
  }

  getSubjects(){
    return this.http.get<Lecture[]>(environment.apiUrl+"subjects").pipe();
  }

  getProfessors(){
    return this.http.get<Lecture[]>(environment.apiUrl+"professors").pipe();
  }

  addLecture(payload){
    console.log('payload ',payload)
    var body = {
      class_id : payload.class,
      prof_id : payload.professor,
      sub_id : payload.subject,
      lec_date : payload.lec_date,
      lec_start_time : payload.lec_start_time
    }
    return this.http.post(environment.apiUrl+"lecture",body).pipe()
  }
}
