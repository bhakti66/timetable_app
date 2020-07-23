import { Time } from '@angular/common';

export interface Lecture  {
    sub_id?: number;
    class_id?: number;
    prof_id?: number;
    lec_date?: Date;
    lec_start_time?: Time;
  }
  