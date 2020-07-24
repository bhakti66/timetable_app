import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LectureService } from '../services/lecture.service';
import { Store } from '@ngxs/store';
import { AddLecture, GetLectures } from '../store/lectures/lectures.action';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
  @Input('modalReference') modalReference;
  profForm: FormGroup;
  classes: any[];
  subjects: any[];
  professors: any[];
  timeSlots = ["9:00","10:00","11:00","12:00","14:00","15:00"]
  constructor(private formBuilder: FormBuilder,private lectureService: LectureService,private store: Store) { }


  ngOnInit() {
    this.profForm = this.formBuilder.group({
      class: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      professor: ["", [Validators.required]],
      lec_date: ["", [Validators.required]],
      lec_start_time: ["", [Validators.required]],
    });

    this.lectureService.getClasses().subscribe((results)=>{

      this.classes = results['data']
    })    

    this.lectureService.getSubjects().subscribe((results)=>{
      this.subjects = results['data']
    })

    this.lectureService.getProfessors().subscribe((results)=>{
      this.professors = results['data']
    })
  }

  addLecture(){
    if(this.profForm.value['lec_date'].year){
      this.profForm.value['lec_date'] = this.profForm.value['lec_date'].year+"-"+this.profForm.value['lec_date'].month+"-"+this.profForm.value['lec_date'].day
      this.store.dispatch(new AddLecture(this.profForm.value)).subscribe((results)=>{
        if(!results.lecture['lecture'].status){
          alert(results.lecture['lecture'].message)
        }
        else{
          console.log('results ',results)
          this.store.dispatch(new GetLectures())
          this.modalReference.close()
        }
      })
    }
  }
}
