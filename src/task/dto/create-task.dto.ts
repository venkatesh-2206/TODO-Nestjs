import {  isEnum, IsNotEmpty, IsNumber, isNumber,IsEnum } from "class-validator";
enum status{
    pending="Pending",
    inprogress="Inprogress",
    completed="completed"
}
export class CreateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    bucketId:number
    @IsNotEmpty()
    task:string
    @IsNotEmpty()
    @IsEnum(status)
    status:status
    @IsNotEmpty()
    @IsNumber()
    categoryId:number
}
