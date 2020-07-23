import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LectureSelectors } from '../store/lectures/lectures.selectors';
import { Observable } from 'rxjs';
import { Lecture } from '../models/lectures';
import { GetLectures } from '../store/lectures/lectures.action';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lectures = []
  modalReference
  isAddProf:boolean = false
  isAddLec:boolean = false
  modalType:string = ""
  constructor(private store: Store,private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.store.dispatch(new GetLectures()).subscribe((results)=>{
      this.lectures = results.lecture['lectures']
      console.log('lec results ',this.lectures)
    })
  }

  open(content,key) {
    this.modalType = key
    if(key=='prof'){
      this.isAddProf = true
      this.isAddLec = false
    }
    else{
      this.isAddProf = false
      this.isAddLec = true
    }
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
}
