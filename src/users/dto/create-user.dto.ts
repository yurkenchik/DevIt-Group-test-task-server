import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    readonly balance: number
}