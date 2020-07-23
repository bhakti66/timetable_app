import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { RegisterUser } from '../store/auth/auth.action';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.scss']
})
export class AddProfessorComponent implements OnInit {
  @Input('modalReference') modalReference;
  profForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private store: Store) { }

  ngOnInit() {
    this.profForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  addProfessor(){
    this.store.dispatch(new RegisterUser(this.profForm.value,true)).subscribe((result)=>{
      this.modalReference.close()
    },(err)=>{

    })
  }

}
