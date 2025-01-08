import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBucketDto {
   @IsNumber()
   @IsNotEmpty()
   userId:number;
   @IsNotEmpty()
   bucketName:string;

}
