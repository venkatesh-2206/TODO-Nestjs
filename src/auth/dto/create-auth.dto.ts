import { IsEmail,IsNotEmpty,IsString,Length } from "class-validator";
import { Role } from "src/enum/enum";
export class CreateAuthDto {
        @IsEmail()
        email:string;
        @IsNotEmpty()
        @Length(4,6)
        password:string
        @IsNotEmpty()
        @IsString()
        role:Role
}
