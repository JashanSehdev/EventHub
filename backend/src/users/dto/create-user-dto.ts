import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../enum/roles.enum.js";
import { Status } from "../enum/status.enum.js";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    email : string

    @IsOptional()
    @IsEnum(UserRole)
    role : UserRole
    
    @IsOptional()
    @IsEnum(Status)
    status : Status

}