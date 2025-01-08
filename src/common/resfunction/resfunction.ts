import { response } from "express"
import { json } from "stream/consumers"

export function resfunction(status:number,message:string,result:any[]){
    return response.json ({
        status:status,
        message:message,
        result:result
    })
}
