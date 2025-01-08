import { IsEmail,IsNotEmpty,Length } from "class-validator";
export class CreateAuthDto {
        @IsEmail()
        email:string;
        @IsNotEmpty()
        @Length(4,6)
        password:string
}
