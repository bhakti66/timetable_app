import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LectureSelectors } from '../store/lectures/lectures.selectors';
import { Observable } from 'rxjs';
import { Lecture } from '../models/lectures';
import { GetLectures } from '../store/lectures/lectures.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lectures = []
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetLectures()).subscribe((results)=>{
      this.lectures = results.lecture['lectures']
      console.log('lec results ',this.lectures)
    })
  }
}
