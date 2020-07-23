import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LectureSelectors } from '../store/lectures/lectures.selectors';
import { Observable } from 'rxjs';
import { Lecture } from '../models/lectures';
import { GetLectures } from '../store/lectures/lectures.action';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LectureService } from '../services/lecture.service';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(LectureSelectors.getLectures) lectures$: Observable<Lecture[]>
  lectures = []
  filteredLectures =[]
  modalReference
  isAddProf:boolean = false
  isAddLec:boolean = false
  modalType:string = ""
  professors:any[]
  selectedProf = 'all'
  selectedDate = null
  page:number = 1;
  pageSize = 5;
  constructor(private store: Store,private authService: AuthService, private modalService: NgbModal,
    private lectureService: LectureService) { }

  ngOnInit() {
    this.lectureService.getProfessors().subscribe((results)=>{
      this.professors = results['data']
    })

    this.store.dispatch(new GetLectures()).subscribe((results)=>{
      this.lectures = results.lecture['lectures']
      this.filteredLectures = this.lectures
    })

    this.lectures$.subscribe((results)=>{
      if(results){
        this.lectures = results  
        this.filteredLectures = this.lectures
      }
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

  filterByProf(){
    if(this.selectedProf!='all'){
      this.filteredLectures = this.lectures.filter((lec)=>{
        if(lec.prof_id==this.selectedProf){
          return lec
        }
      })
    }
    else{
      this.filteredLectures = this.lectures
    }
  }

  filterByDate(event){
    this.selectedDate=null
    if(event){
      if(event.month<10){
        this.selectedDate = event.year + "-0"+event.month+"-"+event.day
      }
      else{
        this.selectedDate = event.year + "-"+event.month+"-"+event.day
      }
    }
    if(this.selectedDate!=null){
      this.filteredLectures = this.lectures.filter((lec)=>{
        if(lec.lec_date==this.selectedDate){
          return lec
        }
      })
    }
    else{
      this.filteredLectures = this.lectures
    }
  }
}
