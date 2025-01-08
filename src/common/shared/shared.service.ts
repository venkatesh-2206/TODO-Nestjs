import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'src/common/interface/responsedto';

@Injectable()
export class SharedService {
    async pagination(data:any[],page:number,limit:number):Promise<Response>{
            const totalPages:number=(data.length)/limit;
            const startCount:number=(page-1) * limit;
            //console.log(limit);
            //console.log(startCount)
            const endCount:number=(startCount)+limit;
            console.log(startCount,endCount);
            const displayData:any[]= data.splice(startCount,endCount)
            return { status:HttpStatus.OK,
                     message:"pagination successfull",
                     result:displayData
            }    
    }
}
