import { OutputUser } from "./user";

export interface Question {
    id: string,
    ask: string,
    options: Option[],
    hint: string,
    status: boolean,
    answer: string,
    messageSuccess: string,
    messageError: string,
    question_category: string,
    question_user: OutputUser,
}

export interface Option {
    label: string,
    check: boolean
}