import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../users/enum/roles.enum.js';

export class RegisterUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
