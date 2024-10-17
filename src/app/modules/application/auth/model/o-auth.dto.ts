import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class OAuthDto {

  @IsString()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  firstName: string;
  
  @IsString()
  @IsOptional()
  accessToken: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsBoolean()
  @IsString()
  provider: string;
}
