import { Selector } from "@ngxs/store";

import { User } from "../../models/user";
import { LectureState } from './lectures.state';
import { LectureStateModel } from './lectures-state.model';
import { Lecture } from '../../models/lectures';

export class LectureSelectors {
    @Selector([LectureState])
    static getLectures(state: LectureStateModel): Lecture[] {
      console.log('state ',state)
      return state.lectures;
    }
  
  }