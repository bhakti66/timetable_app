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
}
