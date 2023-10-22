import { Question } from "./question";

export interface CategotyInput {
    name: string,
}

export interface OutputCategory {
    id: string,
    name: string,
    questions: Question[],
    createdAt: Date,
}