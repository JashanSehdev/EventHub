import { IsEnum, IsOptional, IsString } from "class-validator";
import { RegistrationStatus } from "../enum/registration.enum.js";
import { FilterDto } from "../../common/dto/filter-dto.js";

export class FilterAttendeeDto extends FilterDto {
    
    @IsOptional()
    @IsEnum(RegistrationStatus)
    status : RegistrationStatus.ACTIVE

}
