import jwt from 'jsonwebtoken'

const auth= async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth=token.length < 500;

        let decodedData;
        
        if(token & isCustomAuth){
            decodedData=jwt.verify(token,'secret')
            req.userId =decodedData?.id
        
        }else{
            decodedData=jwt.decode(token)
            // """"sub"""" is goole name for a specific id that defrantiont specific user id
            req.userId=decodedData?.sub
        }
        next()
    } catch (error) {
      console.log(error);
        
    }
}
export default auth