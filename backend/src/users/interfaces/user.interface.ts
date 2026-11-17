import { UserRole } from "../enum/roles.enum.js"


interface Profile {
    firstName : string,
    lastName : string
}

export interface BaseUser {
    id : number,
    username : string,
    role : UserRole,
    avatar : string,
    email : string
}

export interface Me extends BaseUser {
    profile ?: Profile
}




