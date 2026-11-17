import { IsEnum, IsOptional } from "class-validator";
import { FilterDto } from "../../common/dto/filter-dto.js";
import { UserRole } from "../enum/roles.enum.js";
import { Status } from "../enum/status.enum.js";

export class FilterUserDto extends FilterDto {
    @IsOptional()
    @IsEnum(UserRole)
    role : UserRole

    @IsOptional()
    @IsEnum(Status)
    status : Status
}