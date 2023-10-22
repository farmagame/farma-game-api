import { Role } from "@prisma/client";

export interface InputUser {
    name: string,
    email: string,
    password: string,
    permissions: Role
}

export interface OutputUser {
    id: number,
    name: string,
    email: string,
    permissions: number[],
    createdAt: Date,
}