import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserEntity } from "src/app/modules/infrastructure/entities/general/user.entity";


export class TokenDto{
    @IsString()
    @IsNotEmpty()
    access_token: string;
    @IsString()
    @IsNotEmpty()
    refresh_token: string;

    @Type(() => UserEntity)
    @IsOptional()
    user: UserEntity;
}