interface Organizer {
    id : number,
    username : string,
    email : string,
    avatar ?: string
}

export interface IEvent {
    id : number,
    title : string,
    description : string,
    organizerId : number,
    startTime : string | Date,
    endTime : string | Date,
    location : string,
    publish : boolean,
    createdAt : string | Date,
    updatedAt : string | Date
    organizer : Organizer
    registeredUsers : number,
    isRegistered ?: boolean
}