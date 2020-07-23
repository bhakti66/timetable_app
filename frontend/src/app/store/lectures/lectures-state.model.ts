import { User } from "../../models/user";
import { Time } from '@angular/common';
import { Lecture } from '../../models/lectures';

export class LectureStateModel {
  lectures?: Lecture[];
  lecture?: Lecture
}
