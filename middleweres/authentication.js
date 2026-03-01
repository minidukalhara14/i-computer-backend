 import jwt from "jsonwebtoken";
 
 export default function authentication(req , res , next){
        
        const header = req.header("Authorization") 
        
        
        if(header != null){
            
            const token = header.replace("Bearer " ,"")
            

            jwt.verify(token , "I-computers" ,
                (error , decoded)=>{
                   if(decoded == null){
                       res.json(
                        {
                            message : "Invalid Token Please Login Again"
                       }
                    )

                   }else{
                        req.user = decoded
                        next() 
                   }
                }
            )

        }else{
            next() 
        }


       
    }