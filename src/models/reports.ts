import { Question } from "./question";

export interface ReportsGamePlayer {
    idUser: string,
    age: number,
    sex: string,
    city: string,
    state: string,
    typeGame: string,
    rightQuestions: Question[],
    wrongQuestions: Question[],
}