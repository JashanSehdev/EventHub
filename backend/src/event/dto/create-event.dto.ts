import { IsBoolean, IsString } from "class-validator";

export class CreateEventDto {

    @IsString()
    title : string

    @IsString()
    description : string

    @IsBoolean()
    publish : boolean

    @IsString()
    startTime : string

    @IsString()
    endTime : string

    @IsString()
    location : string
}
