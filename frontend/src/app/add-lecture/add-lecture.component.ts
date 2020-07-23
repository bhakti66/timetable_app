import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
  profForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.profForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      professor: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

}
