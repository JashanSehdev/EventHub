import { RegistrationStatus } from "../enum/registration.enum.js";

export interface IAttendee {
    registrationId : number,
    eventId : number,
    userId : number,
    username : string,
    email : string,
    avatar : string,
    status : RegistrationStatus,
    createdAt: string | Date,
    updatedAt: string | Date

}