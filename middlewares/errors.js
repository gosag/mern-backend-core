const errorHandler=(err,req,res,next)=>{
    const status = err.statusCode || err.status || 500;
    if (status !== 500) {
        return res.status(status).json({ message: err.message });
    }
    if(err.name==="CastError"){
        return res.status(400).json({message:"Invalid ID format"})
    }
    if(err.name==="ValidationError"){
        return res.status(400).json({message:err.message})
    }
    if(err.code===11000){
        return res.status(400).json({message:"MongoDb error Duplicate field value entered"})
    }
    res.status(500).json({message:"Internal Server Error"})
}
export default errorHandler;