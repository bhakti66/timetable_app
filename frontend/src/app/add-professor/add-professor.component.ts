import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.scss']
})
export class AddProfessorComponent implements OnInit {
  profForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

}
