import { IsString, IsNotEmpty, IsEmail, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class SignupDto {

  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean ;

  @IsOptional()
  refreshToken: string;

  @IsOptional()
  strategyKey: string;

  @IsOptional()
  isCompleted: boolean

  @IsOptional()
  provider: string;
}
