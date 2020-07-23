import { Lecture } from "../../models/lectures";

export class GetLectures {
    static readonly type = "[Lectures] GetLectures";
    constructor() { }
}

export class AddLecture{
    static readonly type = "[Lectures] AddLecture"
    constructor(public payload : Lecture){}
}